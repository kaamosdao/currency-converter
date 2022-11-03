import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './slices/index';
import { ILocalStorageData, IMakeRequest } from './interfaces/interfaces';
import HttpClientContext from './hooks/HttpClientContext';
import LocalStorageContext from './hooks/localStorageContext';

const init = (httpClient: IMakeRequest, localStorage: ILocalStorageData) => (
  <Provider store={store}>
    <LocalStorageContext.Provider value={localStorage}>
      <HttpClientContext.Provider value={httpClient}>
        <App />
      </HttpClientContext.Provider>
    </LocalStorageContext.Provider>
  </Provider>
);

export default init;
