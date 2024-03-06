import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div>
      <h1 className={css.title}>PHONEBOOK:</h1>
      <p className={css.text}>
        Contacts <span className={css.span}>Collected</span>, Connections{' '}
        <span className={css.span}>Perfected</span>
      </p>
    </div>
  );
}
