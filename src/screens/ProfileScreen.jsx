import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string()
  .email("Provide a valid email address")
  .required("Email is required"),
name: yup.string().required("Name is required"),
});

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

const [updateProfile, { isLoading }] = useUpdateUserMutation();


  const formik = useFormik({
    initialValues: {
      email: userInfo.email,
      name: userInfo.name,
      password: '',
      confirmPassword: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await updateProfile({
            _id: userInfo._id,
            name:values.name,
            email : values.email,
            password : values.password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    },
  });

  if(isLoading) return <Loader/>

  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={formik.values.name}
            {...formik.getFieldProps('name')}
          ></Form.Control>
          <small>{formik.errors.name}</small>
        </Form.Group>

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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={formik.values.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
          ></Form.Control>
          <small>{formik.errors.confirmPassword}</small>
        </Form.Group>

        <Button disabled={!formik.isValid} type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;