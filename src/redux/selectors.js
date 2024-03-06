import { createSelector } from '@reduxjs/toolkit';

export const selectContactsItems = state => state.contacts.items;
export const selectContactsLoading = state => state.contacts.loading;
export const selectContactsError = state => state.contacts.error;
export const selectFilter = state => state.filters.name;

export const selectVisibleContacts = createSelector(
  [selectContactsItems, selectFilter],
  (items, filter) => {
    return items.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) || contact.number.includes(filter)
    );
  }
);
