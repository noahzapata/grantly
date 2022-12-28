import React, { useState } from 'react';
import { useFormik } from 'formik';
import styles from '../styles/CreateProduct.module.scss';
import * as yup from 'yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { addUserData, setUserLogin } from '../store/slices/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

const validationSchema = yup.object({
  title: yup
    .string('Enter Product title')
    .min(4, 'Title should be of minimum 4 characters length')
    .required('Title is required'),

  description: yup
    .string('Enter Product description')
    .min(4, 'Description should be of minimum 4 characters length')
    .required('A description is required'),
  image: yup.mixed().required('File is required'),
  tags: yup.mixed().required('Tag is required'),
  price: yup
    .number('Enter a price for this product')
    .min(2, ' should be of minimum 2 characters digits')
    .required('price is required'),
  stock: yup
    .number('Enter a stock for this product')
    .min(2, ' should be of minimum 2 characters digits')
    .required('stock is required'),
});

const CreateProductBody = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      tags: [],
      price: '',
      stock: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // eslint-disable-next-line no-undef
      fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URI}/api/products`, {
        method: 'POST', // or 'PUT'
        headers: {
          Authorization: `Bearer ${Cookies.get('granusr')}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((values) => {
          console.log(values);

          // router.push('/');
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          getDataUser();
        });
    },
  });

  return (
    <main className={styles.signUpMain}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography
          variant='h2'
          fontSize={'3rem'}
          align='center'
          component='div'
          sx={{ flexGrow: 1, marginBottom: 2 }}
        >
          Create a product
        </Typography>

        <Stack spacing={2}>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='title'
              size='title'
              name='title'
              label='Title'
              type='text'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </div>

          <div className={styles.field}>
            <TextField
              fullWidth
              size='small'
              autoComplete='description'
              id='description'
              name='description'
              label='Description'
              multiline
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </div>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='password'
              size='small'
              name='password'
              autoComplete='current-password'
              label='Password'
              type='text'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Stack direction='row' spacing={1}>
            <TextField
              fullWidth
              id='price'
              size='small'
              name='price'
              label='Price'
              type='number'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <TextField
              fullWidth
              id='stock'
              size='small'
              name='stock'
              label='Stock quantity'
              type='number'
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
            />
          </Stack>

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
              {`Have an account already? `}
              <Link href='/login' style={{ textDecoration: 'underline' }}>
                {' '}
                Log in{' '}
              </Link>
            </Typography>
          </div>
        </Stack>
      </form>
    </main>
  );
};

export default CreateProductBody;
