import { useContext } from 'react';
import HttpClientContext from './HttpClientContext.tsx';

const useHttp = () => useContext<HttpClientContext>(HttpClientContext);

export default useHttp;
