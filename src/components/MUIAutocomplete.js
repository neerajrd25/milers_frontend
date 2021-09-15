/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountrySelect({
  name,
  label,
  options,
  control,
  validation = {},
  errors = {},
  inputProps = {},
  otherProps = {},
}) {
  console.log('home re-rending', name);

  // const [value, setValue] = React.useState(countries[0]);
  // const [inputValue, setInputValue] = React.useState('');
  return (
    <Controller
      // defaultValue={options[1]}
      // rules={validation}
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          // inputValue={value}
          // value={value}
          options={options}
          getOptionLabel={(option) => option.name}
          // isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              label={label}
              variant="outlined"
              // error={!!errors[name]}
              // helperText={errors && errors[name]?.message}
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
    />
  );
}
