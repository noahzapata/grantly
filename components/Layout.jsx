import Head from 'next/head';
import React from 'react';
import NavBarMUI from './NavBarMUI';
import styles from '../styles/Home.module.scss';
import Footer from './Footer';

const Layout = ({ footer = false, title, children, classMain = true }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Grantly` : 'Grantly'}</title>
        <meta name='description' content='Grantly' />
        <link rel='icon' href='/LOGO.png' />
      </Head>

      <main>
        <div className={styles.container}>
          <NavBarMUI />
          <main className={classMain ? styles.main : undefined}>
            {children}
          </main>
          {footer ? <Footer /> : <></>}
        </div>
      </main>
    </>
  );
};

export default Layout;
