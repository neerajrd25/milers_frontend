/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

import { PropTypes } from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { createProduct } from 'src/api/product.api';
// import { CardContent } from '@material-ui/core/CardContent';
import { Controller, useForm } from 'react-hook-form';
import {
  Box, Button, Card, CardHeader, CardActions, CardContent, Divider, Grid, TextField, Typography,
} from '@material-ui/core';

import MuiAutoComplete from '../MUIAutocomplete';

import {
  getProductTypes,
  getSuspensions,
  getMaterials,
  getCategories,
  getProductUsers,
  getBrands,
  getBrakes,
  getSizes,
} from '../../api/product.api';

const getOptionList = (arr) => arr.map(({ id, name }) => ({ id, name }));
const getTextFieldValidation = {
  name: { required: 'This is required' },
  description: { required: 'This is required' },
  wheelSize: { required: 'This is required' },
};

const AddProductComponent = ({ submit, defaultValues, title }) => {
  //   const navigate = useNavigate();
  const [productType, setProductType] = useState({ id: 1, name: 'Bicycles' });
  // console.log(defaultValues);

  const {
    data: { data: productTypes },
  } = useQuery(['GetProductTypes'], () => getProductTypes());
  const productTypesOptions = getOptionList(productTypes);
  const {
    data: { data: brands },
  } = useQuery(['GetBrands'], () => getBrands());
  const brandOptions = getOptionList(brands);

  /* detail */
  const {
    data: { data: productUsers },
  } = useQuery(['GetProductUsers'], () => getProductUsers());
  const productUserOptions = getOptionList(productUsers);
  // categories
  const {
    data: { data: categories },
  } = useQuery(['GetCategories'], () => getCategories());
  const categoriesOptions = getOptionList(categories);
  // frame size
  const {
    data: { data: sizes },
  } = useQuery(['GetSizes'], () => getSizes());
  const sizesOptions = getOptionList(sizes);

  // fork material
  const {
    data: { data: materials },
  } = useQuery(['GetMaterials'], () => getMaterials());
  const materialsOptions = getOptionList(materials);
  // suspension
  const {
    data: { data: suspensions },
  } = useQuery(['GetSuspensions'], () => getSuspensions());
  const suspensionsOptions = getOptionList(suspensions);
  // brakes
  const {
    data: { data: brakes },
  } = useQuery(['GetBrakes'], () => getBrakes());
  const brakesOptions = getOptionList(brakes);

  const {
    register, handleSubmit, control, formState, onChange, watch,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const watcherProductType = watch('productType');

  const { isValid, isDirty, errors } = formState;
  const renderTextField = (
    name,
    label,
    validation = {},
    inputProps = {},
    otherProps = {},
  ) => (
    <Grid item md={6} xs={12}>
      {/* <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            variant="outlined"
            error={!!errors[name]}
            onChange={onChange}
            helperText={errors && errors[name]?.message}
            InputProps={{ ...inputProps }}
            {...register(name, validation)}
            // inputRef={register(viladation)}
            {...otherProps}
          />
        )}
      /> */}
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
        // inputRef={register(viladation)}
        {...otherProps}
      />
    </Grid>
  );
  // const renderAutocomplete = (
  //   name,
  //   label,
  //   options,
  //   validation = {},
  //   inputProps = {},
  //   otherProps = {},
  // ) => (
  //   <Grid item md={6} xs={12}>
  //     <Controller
  //       defaultValue={options[0]}
  //       rules={validation}
  //       name={name}
  //       control={control}
  //       render={({ field }) => (
  //         <Autocomplete
  //           {...field}
  //           options={options}
  //           getOptionLabel={(option) => option.name}
  //           isOptionEqualToValue={(option, value) => option.id === value.id}
  //           renderInput={(params) => (
  //             <TextField
  //               fullWidth
  //               {...params}
  //               label={label}
  //               variant="outlined"
  //               error={!!errors[name]}
  //               helperText={errors && errors[name]?.message}
  //             />
  //           )}
  //           onChange={(_, data) => field.onChange(data)}
  //         />
  //       )}
  //     />
  //   </Grid>
  // );

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
    const {
      name,
      year,
      description,
      brand,
      productType: productTypeVal,
      ...productDetail
    } = data;

    const postData = {
      name,
      year,
      description,
      brand: brand.id,
      productType: productTypeVal.id,
    };
    // if bicycle
    if (productType.id === 1) {
      const {
        crankset,
        frontDerailer,
        rearDerailer,
        shifters,
        speed,
        weight,
        wheelSize,
      } = productDetail;

      const detail = {
        crankset,
        frontDerailer,
        rearDerailer,
        shifters,
        speed,
        weight,
        wheelSize,
        category: productDetail.category?.id,
        fork: productDetail.fork?.id,
        forkMaterial: productDetail.forkMaterial?.id,
        frameMaterial: productDetail.frameMaterial?.id,
        frameSize: productDetail.frameSize?.id,
        productUser: productDetail.productUser?.id,
      };
      postData.produtDetail = detail;
    }

    console.log(postData); // TODO : check for productDetail object HERE
    // alert(JSON.stringify(data));
    // createProductMutation(data);
  };

  const onSubmit = (data) => console.log(data);
  // useEffect(() => {
  //   register({ name: 'category' });
  // }, [register]);
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
                {/* {renderAutocomplete('productType', 'Product', productTypesOptions, { required: 'Product Type is required' })} */}
                <MuiAutoComplete
                  control={control}
                  errors={errors}
                  register={register}
                  options={productTypesOptions}
                  label="Product"
                  name="productType"
                  validation={{ required: 'This is required' }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <MuiAutoComplete
                  control={control}
                  errors={errors}
                  register={register}
                  options={brandOptions}
                  label="Brand"
                  name="brand"
                  validation={{ required: 'This is required' }}
                />
              </Grid>
              {renderTextField('name', 'Name', getTextFieldValidation.name)}
              {renderTextField('description', 'Description', {})}
              {renderTextField('year', 'Year', {})}
            </Grid>
          </CardContent>
          {
            // eslint-disable-next-line no-self-compare
            watcherProductType && watcherProductType?.id === 1 && (
              <div> <Divider />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <Typography variant="h4"> Bike Details</Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {/* <Controller
                        defaultValue={categoriesOptions[0]}
                        rules={{ required: 'This is required' }}
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            options={categoriesOptions}
                            getOptionLabel={(option) => option.name}
                            // isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                {...params}
                                label="Category"
                                variant="outlined"
                              // error={!!errors.category}
                              // helperText={errors && errors?.category?.message}
                              />
                            )}
                            onChange={(_, data) => field.onChange(data)}
                          />
                        )}
                      /> */}
                      <MuiAutoComplete
                        control={control}
                        errors={errors}
                        options={categoriesOptions}
                        label="Category"
                        name="category"
                        id="category"
                        validation={{ required: 'This is required' }}
                      />
                      {/* {renderAutocomplete('category', 'Category', categoriesOptions, { required: 'This is required' })} */}
                    </Grid>
                    {renderTextField('wheelSize', 'Wheel Size')}
                    {renderTextField('weight', 'Weight')}
                    {renderTextField('shifters', 'Shifters')}
                    {renderTextField('crankset', 'Crankset')}
                    {renderTextField('frontDerailer', 'Front Derailer')}
                    {renderTextField('rearDerailer', 'Rear Derailer')}
                    {renderTextField('speed', 'Speed')}
                  </Grid>

                </CardContent>
              </div>
            )
          }
          <CardActions />
          <Box sx={{ py: 1, px: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Button
                  color="primary"
                  disabled={!isValid && !isDirty}
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
