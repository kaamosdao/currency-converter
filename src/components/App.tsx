import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Convertation from '../pages/ConvertationPage';
import ExchangeRatesPage from '../pages/ExchangeRatesPage';
import Notfound from '../pages/NotfoundPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Convertation />} />
        <Route path="exchangerates" element={<ExchangeRatesPage />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
