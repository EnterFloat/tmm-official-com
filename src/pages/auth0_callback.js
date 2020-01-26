import React from 'react';
import { handleAuthentication } from '../utils/auth';

const Callback = () => {
  handleAuthentication('true');
  return <p>Loading...</p>;
};

export default Callback;
