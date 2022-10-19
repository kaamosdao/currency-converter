import { createRoot } from 'react-dom/client';
import init from './index.tsx';
import './assets/scss/style.scss';

const render = async () => {
  const container = document.querySelector('#root');
  const root = createRoot(container!);
  const App = init();
  root.render(App);
};

render();
