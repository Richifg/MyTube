import * as React from 'react';

interface IError {
  message: string;
}

const ErrorMessage = ({ message }: IError) => (
  <div className="m-auto text-center">
    <h3 className="text-danger">ERROR</h3>
    <h4>{message}</h4>
  </div>
);

export default ErrorMessage;
