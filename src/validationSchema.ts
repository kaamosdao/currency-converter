import * as yup from 'yup';

export default yup.object().shape({
  converterQuery: yup
    .string()
    .required('Should not be empty'),
});
