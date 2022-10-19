import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import Convertation from './Convertation';
import ExchangeRates from './ExchangeRates';
import Notfound from './NotfoundPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Convertation />} />
        <Route path="exchangerates" element={<ExchangeRates />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
