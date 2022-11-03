import { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { RootState } from '../slices';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export default AppThunk;
