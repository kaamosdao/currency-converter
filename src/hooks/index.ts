import { useContext } from 'react';
import MakeRequest from '../makeRequest';
import HttpClientContext from './HttpClientContext';

const useHttp = () => useContext<MakeRequest>(HttpClientContext);

export default useHttp;
