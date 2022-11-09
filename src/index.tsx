import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './components/App';
import store from './slices/index';
import { ILocalStorageData } from './interfaces/interfaces';
import LocalStorageContext from './hooks/localStorageContext';
import 'bootstrap';
import 'react-toastify/dist/ReactToastify.css';

const init = (localStorage: ILocalStorageData) => (
  <Provider store={store}>
    <LocalStorageContext.Provider value={localStorage}>
      <App />
      <ToastContainer />
    </LocalStorageContext.Provider>
  </Provider>
);

export default init;
