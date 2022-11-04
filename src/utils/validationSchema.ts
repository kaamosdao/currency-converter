import * as yup from 'yup';

export const currencySchema = yup.object().shape({
  currency: yup
    .string()
    .required('Should not be empty')
    .min(3, 'must be at least 3 characters long'),
});

export default yup.object().shape({
  converterQuery: yup
    .string()
    .required('Should not be empty'),
});
