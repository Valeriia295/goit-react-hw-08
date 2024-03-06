import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { setFilter } from '../../redux/filtersSlice';

export default function SearchBox() {
  const dispatch = useDispatch();

  const searchedItem = useSelector(state => state.filters.name);

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.container}>
      <label htmlFor="search-contact" className={css.label}>
        Find contacts by name or number
      </label>
      <input className={css.input} type="text" value={searchedItem} onChange={handleChange} />
    </div>
  );
}
