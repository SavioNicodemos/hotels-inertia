import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorText, ...props }, ref) => {
    return (
      <TextField
        {...props}
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errorText}
        helperText={errorText}
        ref={ref}
      />
    );
  }
);

type InputProps = TextFieldProps & {
  errorText?: string;
};
