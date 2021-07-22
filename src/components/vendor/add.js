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
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createVendor } from 'src/api/product.api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import ArrowBack from '@material-ui/icons/ArrowBack';

const schema = Yup.object().shape({
  businessName: Yup.string().max(50).min(4).required(),
  ownerFirstName: Yup.string().max(50).min(4).required(),
  ownerLastName: Yup.string().max(50).min(4).required(),
  pincode: Yup.string().max(6).min(6).required(),
  gstNumber: Yup.string().max(15).min(8).required(),
  address: Yup.string().max(50).min(4).required(),
  city: Yup.string().max(50).min(3).required(),
  // pancard: Yup.string().max(10).min(10).optional(),
  // contact: Yup.string().max(10).min(10).required()
});

const AddVendorComponent = ({
  submit: save, defaultValues, title, showBackButton
}) => {
  const {
    register, handleSubmit, control, formState, onChange
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const { isValid, isDirty, errors } = formState;

  // const { success, error } = useSnackbarContext();
  // success('Success');
  console.log(errors, isValid, isDirty);
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
        InputProps={{ disableUnderline: true, ...inputProps }}
        {...register(name)}
        {...otherProps}
      />
    </Grid>
  );
  const { mutate: createVendorMutation, isLoading } = useMutation(
    createVendor,
    {
      onSuccess: () => {
        // success('Success');
        console.log('success');
        // cache.refetchQueries('userListingPagniation');
      },
      onError: ({ response: { data: { code, message } } }) => {
        console.log('error', message);
        alert(`Error ${message}`);
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
          {/* {showBackButton && (
            <Grid item>
              <IconButton aria-label="back">
                <ArrowBack />
              </IconButton>
            </Grid>
          )} */}
          <CardHeader
            title={title}
            subheader="Vendor Management"
            titleTypographyProps={{ color: 'textPrimary', variant: 'h3' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              {renderTextField('businessName', 'Business Name')}
              {renderTextField('gstNumber', 'GST Number')}
              {renderTextField('ownerFirstName', 'Owner First Name')}
              {renderTextField('ownerLastName', 'Owner Last Name')}
              {renderTextField('address', 'Address')}
              {renderTextField('city', 'City')}
              {renderTextField('pincode', 'Pincode')}
              {renderTextField('contact', 'Contact')}
              {/* {renderTextField('dateOfEstablishment', 'Date of Establishment')} */}
            </Grid>
          </CardContent>
          <CardActions />

          <Box sx={{ py: 1, px: 2 }}>
            <Button
              color="primary"
              disabled={!isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
            >
              SAVE
            </Button>
            <Button
              color="secondary"
              fullWidth
              size="large"
              type="reset"
            >
              Cancel
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
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
};

export default AddVendorComponent;
