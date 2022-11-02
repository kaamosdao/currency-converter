import React from 'react';
import App from './components/App';
import HttpClientContext from './hooks/HttpClientContext';
import MakeRequest from './makeRequest';

const init = (httpClient: MakeRequest) => (
  <HttpClientContext.Provider value={httpClient}>
    <App />
  </HttpClientContext.Provider>
);

export default init;
