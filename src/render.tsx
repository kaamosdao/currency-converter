import { createRoot } from 'react-dom/client';
import init from './index';
import './assets/scss/style.scss';
import LocalStorageData from './utils/localStorageData';

const render = () => {
  const container = document.querySelector('#root') as Element;
  const root = createRoot(container);
  const localStorageBaseCurrency = new LocalStorageData('baseCurrency');
  const App = init(localStorageBaseCurrency);
  root.render(App);
};

render();
