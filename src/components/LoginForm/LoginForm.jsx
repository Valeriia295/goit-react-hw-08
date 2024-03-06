import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    const loginParams = { email: values.email, password: values.password };
    dispatch(logIn(loginParams));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
    >
      <Form className={css.form}>
        <h1 className={css.title}>LOGIN</h1>
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
          Log in
        </button>
      </Form>
    </Formik>
  );
}
