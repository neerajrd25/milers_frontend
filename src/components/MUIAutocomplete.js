/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import { Autocomplete } from '@material-ui/core';

export default function CountrySelect({
  control, validation, name, register,
}) {
  const [value, setValue] = React.useState(countries[0]);
  const [inputValue, setInputValue] = React.useState('');
  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={value}
          inputValue={inputValue}
          options={countries}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      {...register(name, validation)}
      name={name}
      control={control}
    />
  );
}

// function countryToFlag(isoCode) {
//   return typeof String.fromCodePoint !== 'undefined'
//     ? isoCode
//       .toUpperCase()
//       .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
//     : isoCode;
// }

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
];
