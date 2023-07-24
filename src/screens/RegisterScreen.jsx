import { useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import Loader from "../components/Loader";

const schema = yup.object().shape({
  email: yup.string()
  .email("Provide a valid email address")
  .required("Email is required"),
password: yup.string().required("Password is required"),
confirmPassword: yup.string().required("Confirm Password is required"),
name: yup.string().required("Name is required"),
});

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name:'',
      password: '',
      confirmPassword: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const res = await register({ name:values.name, email: values.email, password: values.password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    },
  });

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={formik.values.name}
            {...formik.getFieldProps('name')}
          ></Form.Control>
          <small>{formik.errors.name}</small>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formik.values.email}
            {...formik.getFieldProps('email')}
          ></Form.Control>
          <small>{formik.errors.email}</small>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={formik.values.password}
            {...formik.getFieldProps('password')}
          ></Form.Control>
          <small>{formik.errors.password}</small>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
          ></Form.Control>
          <small>{formik.errors.confirmPassword}</small>
        </Form.Group>

        <Button disabled={!formik.isValid} type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
