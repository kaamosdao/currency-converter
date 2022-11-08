import { useContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../slices/index';
import { ILocalStorageData } from '../interfaces/interfaces';
import LocalStorageContext from './localStorageContext';

export const useLocalStorage = () => useContext<ILocalStorageData>(LocalStorageContext);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
