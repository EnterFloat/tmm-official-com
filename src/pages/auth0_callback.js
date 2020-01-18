import React from 'react';
import { handleAuthentication } from '../utils/auth';
import { navigate } from 'gatsby';

const Callback = () => {
  console.log("\n\n\n\n\n")

  handleAuthentication("true");
  return <p>Loading...</p>;
};

export default Callback;
