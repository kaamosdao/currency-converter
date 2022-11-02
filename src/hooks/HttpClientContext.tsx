import React from 'react';
import httpClientContextType from '../interfaces/types';

const HttpClientContext = React.createContext<httpClientContextType>({} as httpClientContextType);

export default HttpClientContext;
