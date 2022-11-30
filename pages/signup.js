import React from 'react';
import Layout from '../components/Layout';
import SignUpBody from '../components/SignUpBody';

const signup = () => {
  return (
    <Layout title={'SignUp'} classMain={false}>
      <SignUpBody />
    </Layout>
  );
};

export default signup;
