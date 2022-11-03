import React from 'react';
import { IMakeRequest } from '../interfaces/interfaces';

const HttpClientContext = React.createContext<IMakeRequest>({} as IMakeRequest);

export default HttpClientContext;
