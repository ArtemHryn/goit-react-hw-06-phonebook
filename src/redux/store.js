import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import { contactsReducer } from './contactsSlice';
import { contactSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  filter: filterSlice.reducer,
  contact: contactSlice.reducer
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contact'],
};

export const contactsReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: contactsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
