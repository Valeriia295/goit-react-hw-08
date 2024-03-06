import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Username is too short!')
    .max(20, 'Username is too long')
    .required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    const registerParams = { name: values.name, email: values.email, password: values.password };
    dispatch(register(registerParams));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={registerValidationSchema}
    >
      <Form className={css.form}>
        <h1 className={css.title}>Create an account</h1>
        <label htmlFor={nameFieldId} className={css.label}>
          Username
        </label>
        <Field className={css.input} type="text" name="name" id={nameFieldId}></Field>
        <ErrorMessage className={css.message} name="name" component="span" />

        <label htmlFor={emailFieldId} className={css.label}>
          Email
        </label>
        <Field className={css.input} type="email" name="email" id={emailFieldId}></Field>
        <ErrorMessage className={css.message} name="email" component="span" />

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <Field className={css.input} type="password" name="password" id={passwordFieldId}></Field>
        <ErrorMessage className={css.message} name="password" component="span" />

        <button type="submit" className={css.button}>
          Register
        </button>
      </Form>
    </Formik>
  );
}
