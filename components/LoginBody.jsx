import React from 'react';
import { useFormik } from 'formik';
import styles from '../styles/Login.module.scss';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const LoginBody = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <main>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography
          variant='h1'
          align='center'
          fontSize={'3rem'}
          component='div'
          sx={{ flexGrow: 1 }}
        >
          Login
        </Typography>

        <div className={styles.field}>
          <TextField
            fullWidth
            size='small'
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className={styles.field}>
          <TextField
            fullWidth
            id='password'
            size='small'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className={styles.field}>
          <Button
            color='primary'
            size='large'
            variant='contained'
            fullWidth
            type='submit'
          >
            Submit
          </Button>
        </div>
        <div className={styles.field}>
          <Typography
            variant='p'
            component='div'
            align='center'
            sx={{ flexGrow: 1 }}
          >
            {`Don't have an account? `}
            <Link href='/signup' style={{ textDecoration: 'underline' }}>
              {' '}
              Sign up{' '}
            </Link>
          </Typography>
        </div>
      </form>
    </main>
  );
};

export default LoginBody;
