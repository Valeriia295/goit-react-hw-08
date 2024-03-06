import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectVisibleContacts } from '../../redux/selectors';

export default function ContactList() {
  const visibleContacts = useSelector(selectVisibleContacts);

  if (visibleContacts.length === 0) {
    return (
      <div className={css.text}>
        <p>No contacts found.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className={css.list}>
        {visibleContacts.map(item => (
          <li key={item.id} className={css.item}>
            <Contact item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
