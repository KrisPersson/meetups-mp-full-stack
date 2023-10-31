import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .ensure()
    .nonNullable()
    .required('Username is required'),
  password: yup
    .string()
    .ensure()
    .nonNullable()
    .required('Password is required'),
});

export const meetupIdSchema = yup.object().shape({
  meetupId: yup
    .string()
    .trim()
    .ensure()
    .nonNullable()
    .required('Meetup Id is required'),
});
export const reviewSchema = yup
  .object()
  .shape({
    reviewing: yup
      .string()
      .ensure()
      .trim()
      .nonNullable()
      .required('Reviewing is required'),
    rating: yup
      .number()
      .min(1, 'Rating must be greater than or equal to 1')
      .max(5, 'Rating must be less than or equal to 5')
      .required('Rating is required'),
  })
  .concat(meetupIdSchema);
