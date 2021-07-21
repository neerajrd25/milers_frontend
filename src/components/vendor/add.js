/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createVendor } from 'src/api/product.api';

const getTextFieldValidation = {
  businessName: { required: ' Name is required' },
  ownerFirstName: { required: ' ownerFirstName is required' }
};
const AddVendorComponent = ({ submit: save, defaultValues, title }) => {
  console.log('Place holder');

  const {
    register, handleSubmit, errors, control, formState
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });
  const { isValid, isDirty } = formState;

  const renderTextField = (
    name,
    label,
    validation,
    inputProps = {},
    otherProps = {}
  ) => {
    console.log(errors);
    return (
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          name={name}
          id={name}
          label={label}
          variant="outlined"
          error={!!errors}
          helperText={errors && errors[name]?.message}
          InputProps={{ disableUnderline: true, ...inputProps }}
          {...register(name, validation)}
          {...otherProps}
        />
      </Grid>
    );
  };
  const { mutate: createVendorMutation, isLoading } = useMutation(
    createVendor,
    {
      onSuccess: () => {
        console.log('success');
        // cache.refetchQueries('userListingPagniation');
      },
      onError: (dataError) => {
        console.log('error');
      }
    }
  );
  const submitData = async (data) => {
    // const {
    //   userId, firstName, lastName, emailId, displayName, phoneNumber, preferredLanguage,
    // } = data;
    console.log(data);
    createVendorMutation(data);
  };

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
              {renderTextField(
                'businessName',
                'Business Name',
                getTextFieldValidation.businessName
              )}
              {renderTextField(
                'ownerFirstName',
                'Owner First Name',
                getTextFieldValidation.ownerFirstName
              )}
            </Grid>
          </CardContent>
          <CardActions />

          <Box sx={{ py: 1 }}>
            <Button
              color="primary"
              disabled={!isValid || !isDirty}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              SAVE
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
};
AddVendorComponent.propTypes = {
  submit: PropTypes.func,
  defaultValues: PropTypes.object,
  title: PropTypes.string
};

export default AddVendorComponent;
