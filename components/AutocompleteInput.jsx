import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';

export default function AutocompleteInput({
  cities,
  id,
  action,
  value,
  label,
}) {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} sx={{ width: 240 }}>
      <Autocomplete
        freeSolo
        id={id}
        value={value}
        onChange={(_, newE) => dispatch({ type: action, payload: newE })}
        options={cities.map(option => {
          return `${option.city}, ${option.iata} - ${option.country}`;
        })}
        renderInput={params => <TextField {...params} label={label} />}
      />
    </Stack>
  );
}
