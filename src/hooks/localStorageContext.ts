import React from 'react';
import { ILocalStorageData } from '../interfaces/interfaces';

const LocalStorageContext = React.createContext<ILocalStorageData>({} as ILocalStorageData);

export default LocalStorageContext;
