import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {useLoginMutation} from "../slices/userApiSlice"
import {setCredentials} from "../slices/authSlice"
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';


const schema = yup.object().shape({
  email: yup.string()
  .email("Provide a valid email address")
  .required("Email is required"),
password: yup.string().required("Password is required"),
});


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await login({ email, password }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     navigate('/');
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await login({ email: values.email, password: values.password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={formik.values.email}
            {...formik.getFieldProps('email')}
          ></Form.Control>
          <small>{formik.errors.email}</small>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={formik.values.password}
            {...formik.getFieldProps('password')}
          ></Form.Control>
          <small>{formik.errors.password}</small>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader/>}

      <Row className='py-3'>
        <Col>
          New Customer? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;