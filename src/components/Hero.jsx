import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const {userInfo} = useSelector(state=>state.auth)
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Hello {userInfo?.name}!</h1>
          <p className='text-center mb-4'>
          <strong>Stay Connected!</strong> Many exciting updates are on the way to enhance your experience. We are continuously working to improve this page, so be sure to check back often for new features and improvements.
          </p>
          {/* <div className='d-flex'>
          <LinkContainer to="/login">
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
          </LinkContainer>
          <LinkContainer to="/register">
            <Button variant='secondary'>
              Sign up
            </Button>
          </LinkContainer>
          </div> */}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;