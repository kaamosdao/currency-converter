import * as yup from 'yup';

export default yup.object().shape({
  task: yup
    .string()
    .required('Should not be empty'),
});
