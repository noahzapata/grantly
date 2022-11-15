import Head from 'next/head';
import React from 'react';
import NavBarMUI from './NavBarMUI';

const Layout = (title, children) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Grantly` : 'Grantly'}</title>
        <meta name='description' content='Grantly' />
        <link rel='icon' href='/LOGO.png' />
      </Head>
      <NavBarMUI />
    </>
  );
};

export default Layout;
