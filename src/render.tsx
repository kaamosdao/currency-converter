import { createRoot } from 'react-dom/client';
import axios from 'axios';
import MakeRequest from './utils/makeRequest';
import init from './index.tsx';
import './assets/scss/style.scss';
import routes from './utils/routes';
import LocalStorageData from './utils/localStorageData';

const render = async () => {
  const container = document.querySelector('#root');
  const root = createRoot(container!);
  const axiosInstance = axios.create();
  const httpClient = new MakeRequest(axiosInstance, routes);
  const localStorageBaseCurrency = new LocalStorageData('baseCurrency');
  const App = init(httpClient, localStorageBaseCurrency);
  root.render(App);
};

render();
