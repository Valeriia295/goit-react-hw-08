import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import css from '../ContactsPage/ContactsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/operations';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.contacts.loading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {loading && <p className={css.loading}>Loading...Please wait</p>}
      {error && <p className={css.text}>Oops!Something went wrong, please try again later.</p>}
      <div className={css.container}>
        <h1 className={css.title}>
          Phone<span className={css.span}>book</span>
        </h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </>
  );
}
