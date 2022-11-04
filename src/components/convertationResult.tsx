import React from 'react';
import { useAppSelector } from '../hooks';
import { loadingType, thunkError } from '../interfaces/types';
import errorHandler from '../utils/errorHandlers';
import Spinner from './Spinner';

const ConvertationResult: React.FC = () => {
  const result: string = useAppSelector((state) => state.convertation.result);
  const loadingStatus: loadingType = useAppSelector((state) => state.convertation.loadingStatus);
  const error: thunkError = useAppSelector((state) => state.convertation.error);

  if (loadingStatus === 'failed' && error) {
    return (
      <div className="result mt-3">
        <p className="text-danger">
          Error:&nbsp;
          {errorHandler(error.code)}
        </p>
      </div>
    );
  }

  return (
    <div className="result mt-3">
      {loadingStatus === 'loading' ? (
        <Spinner />
      ) : (
        <p>
          Convertation:&nbsp;
          {result}
        </p>
      )}
    </div>
  );
};

export default ConvertationResult;
