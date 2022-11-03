import { useContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../slices/index';
import { IMakeRequest, ILocalStorageData } from '../interfaces/interfaces';
import HttpClientContext from './HttpClientContext';
import LocalStorageContext from './localStorageContext';

const useHttp = () => useContext<IMakeRequest>(HttpClientContext);
export const useLocalStorage = () => useContext<ILocalStorageData>(LocalStorageContext);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useHttp;
