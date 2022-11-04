import { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { RootState } from '../slices';
import { IRequestError } from './interfaces';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export type loadingType = 'loading' | 'idle' | 'failed';
export type thunkError = null | IRequestError;

export default AppThunk;
