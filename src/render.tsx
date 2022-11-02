import { createRoot } from 'react-dom/client';
import axios from 'axios';
import MakeRequest from './makeRequest';
import init from './index.tsx';
import './assets/scss/style.scss';
import routes from './routes';

const render = async () => {
  const container = document.querySelector('#root');
  const root = createRoot(container!);
  const axiosInstance = axios.create();
  const httpClient = new MakeRequest(axiosInstance, routes);
  const App = init(httpClient);
  root.render(App);
};

render();
