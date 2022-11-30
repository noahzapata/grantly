import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { useJwt } from 'react-jwt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useGetCookies from '../services/Cookies/useGetCookies';

import React from 'react';
import Link from 'next/link';

const NavBarMUI = () => {
  const user = useGetCookies('lausrin');
  const { isExpired } = useJwt(user);
  const auth = isExpired;
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link href='/'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='logo'
          >
            <PaletteIcon />
          </IconButton>
        </Link>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link href='/'>GRANTLY</Link>
        </Typography>
        <Stack direction='row' spacing={2}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='cart'
          >
            <Link href='/'>
              <ShoppingCartIcon />
            </Link>
          </IconButton>

          {auth ? (
            <Button color='inherit'>
              <Link href='/login'>Login</Link>
            </Button>
          ) : (
            <>
              <Button color='inherit'>
                <Link href='/'>User</Link>
              </Button>
              <Button color='inherit'>
                <Link href='/'>favs</Link>
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarMUI;
