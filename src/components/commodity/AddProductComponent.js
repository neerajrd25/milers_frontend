import * as React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Formik } from 'formik';
import { PropTypes } from 'prop-types';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { getProductTypes, getProductUsers } from '../../api/product.api';

const AddProductComponent = ({ submit, defaultValues, title }) => {
  //   const navigate = useNavigate();
  const [productType, setProductType] = React.useState({ id: 1, name: 'Bicycles' });
  console.log(setProductType);
  // console.log(defaultValues);
  const { data: { data: productUsers } } = useQuery(['GetProductUsers'], () => getProductUsers());
  const { data: { data: productTypes } } = useQuery(['GetProductTypes'], () => getProductTypes());

  console.log(productUsers);
  console.log(productTypes);

  return (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          // name: Yup.string().max(255).required('First name is required'),
          name: Yup.string().max(50).required('Name is required'),
          // password: Yup.string().max(255).required('password is required'),
          // policy: Yup.boolean().oneOf([true], 'This field must be checked')
        })}
        onSubmit={(data) => {
          submit(data);
          // navigate('/app/dashboard', { replace: true });
        }}
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
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader
                title={title}
                subheader="Bikes, Accesories, Components, etc"
                titleTypographyProps={{ color: 'textPrimary', variant: 'h3' }}
              />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid md={6} item>
                    <FormControl>
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid md={6} item>
                  <FormControl>
                    <InputLabel id="userLabel">Product Type</InputLabel>
                    <Select
                      id="productType"
                      label="Product Type"
                      value={productType}
                    >
                      {productTypes.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} item>
                  <FormControl>
                    d
                  </FormControl>
                </Grid>
                <Divider />
                {productType.id === 1 && <span> Hello </span>}
                {/* <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                /> */}
                <Grid md={6} item>
                  <FormControl>
                    <InputLabel id="userLabel">Product Users</InputLabel>
                    <Select
                      id="userSelection"
                      label="Product Users"
                      value={values.productUser}
                    >
                      {productUsers.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>{errors.policy}</FormHelperText>
                )}
              </CardContent>
              <CardActions>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    SAVE
                  </Button>
                </Box>
              </CardActions>
              {/* <Typography color="textSecondary" variant="body1">
                Have an account?
                {' '}
                {' '}
                <Link component={RouterLink} to="/login" variant="h6">
                  Sign in
                </Link>
              </Typography> */}
            </form>
          </Card>
        )}
      </Formik>
    </>
  );
};
AddProductComponent.propTypes = {
  submit: PropTypes.func,
  defaultValues: PropTypes.object,
  title: PropTypes.string
};

export default AddProductComponent;
