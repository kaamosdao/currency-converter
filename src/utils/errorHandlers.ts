const errorHandler = (code: string): string => {
  switch (code) {
    case '400':
      return 'Incorrect parameters in request, please try again';
    default:
      return 'Internal error, please try later';
  }
};

export default errorHandler;
