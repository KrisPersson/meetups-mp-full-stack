import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .ensure()
    .nonNullable()
    .required('Username is required'),
  password: yup
    .string()
    .trim()
    .ensure()
    .nonNullable()
    .required('Password is required'),
});
