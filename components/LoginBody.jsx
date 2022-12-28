import React, { useState } from 'react';
import { useFormik } from 'formik';
import styles from '../styles/Login.module.scss';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { addUserData, setUserLogin } from '../store/slices/userSlice';

import { useDispatch, useSelector } from 'react-redux';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  const getDataUser = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URI}/api/users/data`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('granusr')}`,
        },
      })
      .then((res) => {
        const { data } = res;

        dispatch(
          addUserData({
            profilePicture: data.data.profilePicture,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            birthdate: data.data.birthdate,
            address: {
              country: data.data.address.country,
              province: data.data.address.province,
              city: data.data.address.city,
            },
            email: data.data.email,
            mobile: data.data.mobile,
            comments: data.data.comments,
            favs: data.data.favs,
            products: data.data.products,
            shoppingHistory: data.data.shoppingHistory,
          })
        );
        Cookies.set('userData', JSON.stringify(userData));
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URI}/api/users/signin`,
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )
        .then((response) => response.json())
        .then((values) => {
          Cookies.remove('granusr');
          Cookies.set('granusr', values.data.token);
          dispatch(setUserLogin({ isLogin: true }));

          router.push('/');
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          setSubmitting(true);
          resetForm();
          router.push('/');
          getDataUser();
        });
    },
  });

  return (
    <main>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography
          variant='h2'
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
            autoComplete='true'
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
