/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signIn } from '../api/authentication.api';

const Login = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  // console.log(data);
  // // FIX ME: call auth here
  const { mutate: signInMutation } = useMutation(signIn, {
    onSuccess: () => {
      console.log('Client User has been added successfully');
      // cache.refetchQueries('userListingPagniation');
      // history.push('/users');
      navigate('/app/dashboard', { replace: true });
    },
    onError: (dataError) => {
      console.log(dataError);
      // error(dataError?.response?.data?.message? dataError?.response?.data?.message : dataError?.response?.data);
    },
  });

  const doLogin = async (data) => {
    const {
      username, password,
    } = data;
    console.log(password, 'psss');
    signInMutation({
      username,
      password,
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: '123456',
              username: 'yadnesh'
            }}
            validationSchema={Yup.object().shape({
              // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
              username: Yup.string().max(20).required('Username is required')
            })}
            onSubmit={(data) => doLogin(data)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Palghar Milers
                  </Typography>
                </Box>
                {/* <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                /> */}
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
