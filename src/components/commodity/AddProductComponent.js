/* eslint-disable no-unused-vars */

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

import { PropTypes } from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProduct } from 'src/api/product.api';

import { getProductTypes, getProductUsers } from '../../api/product.api';

const schema = Yup.object().shape({
  name: Yup.string().max(50).min(4).required(),
  year: Yup.string().max(4).min(4).required()
  // productType: Yup.string().required()
});

const AddProductComponent = ({ submit, defaultValues, title }) => {
  //   const navigate = useNavigate();
  const [productType, setProductType] = useState({ id: 1, name: 'Bicycles' });
  // console.log(defaultValues);
  const {
    data: { data: productUsers }
  } = useQuery(['GetProductUsers'], () => getProductUsers());
  const {
    data: { data: productTypes }
  } = useQuery(['GetProductTypes'], () => getProductTypes());
  const { register, handleSubmit, control, formState, onChange } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { isValid, isDirty, errors } = formState;
  const renderTextField = (
    name,
    label,
    validation = {},
    inputProps = {},
    otherProps = {}
  ) => (
    <Grid item md={6} xs={12}>
      <TextField
        fullWidth
        name={name}
        id={name}
        label={label}
        variant="outlined"
        error={!!errors[name]}
        onChange={onChange}
        helperText={errors && errors[name]?.message}
        InputProps={{ ...inputProps }}
        {...register(name)}
        {...otherProps}
      />
    </Grid>
  );

  const { mutate: createProductMutation, isLoading } = useMutation(
    createProduct,
    {
      onSuccess: () => {
        // success('Success');
        console.log('success');
        // cache.refetchQueries('userListingPagniation');
      },
      onError: ({
        response: {
          data: { code, message }
        }
      }) => {
        console.log('error', message);
        // success('Success');
        alert(`Error ${message}`);
      }
    }
  );
  const submitData = async (data) => {
    // const {
    //   userId, firstName, lastName, emailId, displayName, phoneNumber, preferredLanguage,
    // } = data;
    console.log(data);
    // createProductMutation(data);
  };
  const handleChange = (v) => console.log(v);
  const age = 20;
  return (
    <>
      <Card>
        <form noValidate onSubmit={handleSubmit(submitData)}>
          <CardHeader
            title={title}
            subheader="Vendor Management"
            titleTypographyProps={{ color: 'textPrimary', variant: 'h3' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              {renderTextField('name', 'Name')}
              {renderTextField('description', 'Description')}
              {renderTextField('year', 'Year')}
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  {/* <InputLabel id="input-language" htmlFor="preferredLanguage">
                    Product Type
                  </InputLabel> */}
                  <Controller
                    control={control}
                    name="productType"
                    render={({ name, value }) => (
                      <Autocomplete
                        disablePortal
                        id="productType"
                        options={productTypes}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, selectedValue) => option.id === selectedValue.id}
                        value={value}
                        onChange={(val) => handleChange(val)}
                        name={name}
                        renderInput={(params) => (
                          <TextField
                            {...register('productType')}
                            name={name}
                            {...params}
                            label="Product Type"
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions />

          <Box sx={{ py: 1, px: 2 }}>
            <Grid cotainer direction="row" spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  color="primary"
                  disabled={!isValid}
                  size="large"
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ my: 2 }}
                >
                  SAVE
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button color="secondary" fullWidth size="large" type="reset">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Card>
    </>
  );
};
AddProductComponent.propTypes = {
  submit: PropTypes.func,
  defaultValues: PropTypes.object,
  title: PropTypes.string
};

export default AddProductComponent;
