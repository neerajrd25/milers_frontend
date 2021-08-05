/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';

import { PropTypes } from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { createProduct } from 'src/api/product.api';
// import MuiAutoComplete from '../MUIAutocomplete';
import { getProductTypes, getProductUsers } from '../../api/product.api';

const getOptionList = (arr) => arr.map(({ id, name }) => ({ id, name }));

const AddProductComponent = ({ submit, defaultValues, title }) => {
  //   const navigate = useNavigate();
  const [productType, setProductType] = useState({ id: 1, name: 'Bicycles' });
  // console.log(defaultValues);
  const {
    data: { data: productUsers },
  } = useQuery(['GetProductUsers'], () => getProductUsers());
  const {
    data: { data: productTypes },
  } = useQuery(['GetProductTypes'], () => getProductTypes());

  const productTypesOptions = getOptionList(productTypes);
  const productUserOptions = getOptionList(productUsers);

  const {
    register, handleSubmit, control, formState, onChange,
  } = useForm({
    reValidateMode: 'onBlur',
    mode: 'onChange',
  });

  const { isValid, isDirty, errors } = formState;
  const renderTextField = (
    name,
    label,
    validation = {},
    inputProps = {},
    otherProps = {},
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
        {...register(name, validation)}
        {...otherProps}
      />
    </Grid>
  );
  const renderAutocomplete = (
    name,
    label,
    options,
    validation = {},
    inputProps = {},
    otherProps = {},
  ) => (
    <Grid item md={6} xs={12}>
      <Controller
        render={({ field, value }) => (
          <Autocomplete
            {...field}
            // inputValue={value}
            // value={value}
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                error={!!errors[name]}
                helperText={errors && errors[name]?.message}
              />
            )}
            onChange={(_, data) => field.onChange(data)}
          />
        )}
        // {...register(name, validation)}
        defaultValue={options[0]}
        rules={validation}
        name={name}
        control={control}
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
          data: { code, message },
        },
      }) => {
        console.log('error', message);
        // success('Success');
        // alert(`Error ${message}`);
      },
    },
  );
  const submitData = (data) => {
    // const {
    //   userId, firstName, lastName, emailId, displayName, phoneNumber, preferredLanguage,
    // } = data;
    // TODO : check for productDetail object HERE
    alert(JSON.stringify(data));
    console.log(data);
    // createProductMutation(data);
  };
  const handleChange = (v) => console.log(v);
  // const age = 20;
  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(submitData)}>
          <CardHeader
            title={title}
            subheader="Add Bikes, Components & other stuff"
            titleTypographyProps={{ color: 'textPrimary', variant: 'h3' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                {renderAutocomplete('productType', 'Product', productTypesOptions, { required: 'this is re' })}
                {/* <MuiAutoComplete control={control} register={register} name="productType" validation={{ required: 'this is man' }} /> */}
                {/* <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="productType"
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        // disablePortal
                        options={productTypesOptions}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(opt, selectedVal) => opt.id === selectedVal.id}
                        onChange={(val) => handleChange(val)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product Type"
                            variant="outlined"
                          />
                        )}
                      />
                    )}
                  />
                </FormControl> */}
              </Grid>
              {renderTextField('name', 'Name', { required: 'name is required' })}
              {/* {renderTextField('description', 'Description', { required: 'name is required' })}
              {renderTextField('year', 'Year')} */}
            </Grid>
          </CardContent>
          <Divider />

          <CardActions />

          <Box sx={{ py: 1, px: 2 }}>
            <Grid cotainer spacing={1}>
              <Grid item xs={6} md={6}>
                <Button
                  color="secondary"
                  disabled={!isValid}
                  size="medium"
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ my: 2 }}
                >
                  SAVE
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
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
  title: PropTypes.string,
};

export default AddProductComponent;
