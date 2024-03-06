import { useState } from 'react';
import Modal from 'react-modal';
import css from './ContactModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
};

export default function ContactModal({ isOpen, onClose, item, onUpdate, onDelete, action }) {
  const [updatedName, setUpdatedName] = useState(item.name || '');
  const [updatedNumber, setUpdatedNumber] = useState(item.number || '');

  const handleUpdate = () => {
    if (action === 'edit') {
      onUpdate(item.id, { name: updatedName, number: updatedNumber });
    } else if (action === 'delete') {
      onDelete(item.id);
    }
    onClose();
  };

  const renderContact = () => {
    if (action === 'edit') {
      return (
        <>
          <div className={css.container}>
            <button className={css.closebtn} onClick={onClose}>
              <span className={css.X}></span>
              <span className={css.Y}></span>
            </button>
            <h2 className={css.title}>Edit contact</h2>
            <input
              className={css.input}
              type="text"
              value={updatedName}
              onChange={evt => setUpdatedName(evt.target.value)}
              placeholder="Name"
            />
            <input
              className={css.input}
              type="text"
              value={updatedNumber}
              onChange={evt => setUpdatedNumber(evt.target.value)}
              placeholder="Number"
            />

            <button className={css.button} onClick={handleUpdate}>
              Edit
            </button>
          </div>
        </>
      );
    } else if (action === 'delete') {
      return (
        <>
          <div className={css.container}>
            <button className={css.closebtn} onClick={onClose}>
              <span className={css.X}></span>
              <span className={css.Y}></span>
            </button>
            <h2 className={css.deltitle}>Do you want to delete this contact?</h2>
            <button className={css.button} onClick={handleUpdate}>
              Delete
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={action === 'edit' ? 'Edit contact' : 'Delete contact'}
    >
      {renderContact()}
    </Modal>
  );
}
