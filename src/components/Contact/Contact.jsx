import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../../redux/operations';
import { BsPersonFill, BsTelephoneFill } from 'react-icons/bs';
import ContactModal from '../ContactModal/ContactModal';
import css from './Contact.module.css';
import toast from 'react-hot-toast';

import { useState } from 'react';

export default function Contact({ item }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [action, setAction] = useState('edit');
  const dispatch = useDispatch();

  const handleOpenModal = actionType => {
    setAction(actionType);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdate = (id, updatedData) => {
    dispatch(updateContact({ contactId: id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Contact updated', {
          position: 'top-center',
        });
        handleCloseModal();
      })
      .catch(error => {
        toast.error(`${error.message || 'An unexpected error occured!'}`, {
          position: 'top-center',
        });
      });
  };

  const handleDelete = id => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted', {
          position: 'top-center',
        });
        handleCloseModal();
      })
      .catch(error => {
        console.log(error);
        toast.error(`${error.message || 'An unexpected error occured!'}`, {
          position: 'top-center',
        });
      });
  };

  return (
    <>
      <div className={css.wrapper}>
        <p className={css.text}>
          <BsPersonFill className={css.icon} size="18px" /> {item.name}
        </p>
        <p className={css.text}>
          <BsTelephoneFill className={css.icon} size="16px" /> {item.number}
        </p>
      </div>
      <button className={css.button} onClick={() => handleOpenModal('edit')}>
        Edit
      </button>
      <button className={css.button} onClick={() => handleOpenModal('delete')}>
        Delete
      </button>

      <ContactModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        item={item}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        action={action}
      />
    </>
  );
}
