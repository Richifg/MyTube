import * as React from 'react';

interface IError {
  message: string;
}

// only shown when gapi fails load due to bad api key
// or a bad request/configuration on the api

const ErrorMessage = ({ message }: IError) => (
  <div className="my-auto mx-5 text-center">
    <h3 className="text-danger">ERROR</h3>
    <h4>{message}</h4>
  </div>
);

export default ErrorMessage;
