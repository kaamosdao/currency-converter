import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './slices/index';
import { ILocalStorageData } from './interfaces/interfaces';
import LocalStorageContext from './hooks/localStorageContext';
import 'bootstrap';

const init = (localStorage: ILocalStorageData) => (
  <Provider store={store}>
    <LocalStorageContext.Provider value={localStorage}>
      <App />
    </LocalStorageContext.Provider>
  </Provider>
);

export default init;
