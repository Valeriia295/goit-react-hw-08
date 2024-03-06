import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';

const contactValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Must be only digits in XXX-XXX-XXXX format')
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const contactToAdd = { name: values.name, number: values.number };
    dispatch(addContact(contactToAdd));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId} className={css.label}>
          Name
        </label>
        <Field className={css.input} type="text" name="name" id={nameFieldId}></Field>
        <ErrorMessage className={css.message} name="name" component="span" />

        <label htmlFor={numberFieldId} className={css.label}>
          Number
        </label>
        <Field className={css.input} type="tel" name="number" id={numberFieldId}></Field>
        <ErrorMessage className={css.message} name="number" component="span" />

        <button type="submit" className={css.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
