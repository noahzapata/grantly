import React, { useState } from 'react';
import { useFormik } from 'formik';
import styles from '../styles/SignUp.module.scss';
import * as yup from 'yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { addUserData, setUserLogin } from '../store/slices/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { sub } from 'date-fns/fp';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
  firstName: yup
    .string('Enter your Name')
    .min(2, 'First Name should be of minimum 2 characters length')
    .required('First Name is required'),
  mobile: yup
    .string('Enter your Mobile number')
    .min(10, ' should be of minimum 10 characters length')
    .required('Mobile number is required'),
  lastName: yup
    .string('Enter your Name')
    .min(2, ' should be of minimum 2 characters length')
    .required('Last Name is required'),
  birthdate: yup
    .date()
    .required(`Please enter your child's birthday/due date`)
    .max(sub({ years: 18 }, new Date()), 'User must be over 18 years old'),
  address: yup.object({
    country: yup.string().required('this field is required'),
    province: yup.string().required('province or stated is required'),
    city: yup.string().required('this field is required'),
  }),
});

const SignUpBody = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const getDataUser = async () => {
    await axios
      .get(`http://localhost:8080/api/users/data`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('granusr')}`,
        },
      })
      .then((res) => {
        const { data } = res;
        console.log(data.data);
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
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      profilePicture: '',
      password: '',
      firstName: '',
      lastName: '',
      mobile: '',
      birthdate: format(new Date(), 'yyyy-MM-dd'),
      address: {
        country: 'Colombia',
        province: '',
        city: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      fetch('http://localhost:8080/api/users/signup', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((values) => {
          console.log('Success:', values);
          Cookies.remove('granusr');
          Cookies.set('granusr', values.data.token);
          dispatch(setUserLogin({ isLogin: true }));
          console.log('Success:', values);
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
    <main className={styles.signUpMain}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography
          variant='h2'
          fontSize={'3rem'}
          align='center'
          component='div'
          sx={{ flexGrow: 1, marginBottom: 2 }}
        >
          Join Grantly today
        </Typography>

        <Stack spacing={2}>
          <Stack direction='row' spacing={1}>
            <TextField
              fullWidth
              size='small'
              id='firstName'
              name='firstName'
              label='First Name'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              fullWidth
              size='small'
              id='lastName'
              name='lastName'
              label='Last Name'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='birthdate'
              size='small'
              name='birthdate'
              label='birthdate'
              type='date'
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={
                formik.touched.birthdate && Boolean(formik.errors.birthdate)
              }
              helperText={formik.touched.birthdate && formik.errors.birthdate}
            />
          </div>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='mobile'
              size='small'
              name='mobile'
              label='Mobile Number'
              type='number'
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='address.country'
              size='small'
              name='address.country'
              label='Country'
              value={formik.values.address.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address?.country &&
                Boolean(formik.errors.address?.country)
              }
              helperText={
                formik.touched.address?.country &&
                formik.errors.address?.country
              }
            />
          </div>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='address.province'
              size='small'
              name='address.province'
              label='Province'
              value={formik.values.address.province}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.province &&
                Boolean(formik.errors.address?.province)
              }
              helperText={
                formik.touched.address?.province &&
                formik.errors.address?.province
              }
            />
          </div>
          <div className={styles.field}>
            <TextField
              fullWidth
              id='address.city'
              size='small'
              name='address.city'
              label='City'
              value={formik.values.address?.city}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.city &&
                Boolean(formik.errors.address?.city)
              }
              helperText={
                formik.touched.address?.city && formik.errors.address?.city
              }
            />
          </div>
          <div className={styles.field}>
            <TextField
              fullWidth
              size='small'
              autoComplete='username'
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
              autoComplete='current-password'
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

export default SignUpBody;
