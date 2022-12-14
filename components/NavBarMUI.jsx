import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { useJwt } from 'react-jwt';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookies from 'js-cookie';
import styles from '../styles/Navbar.module.scss';
import { setUserLogin } from '../store/slices/userSlice';
import React, { useState } from 'react';
import Link from 'next/link';

const NavBarMUI = () => {
  const router = useRouter();
  const { firstName, lastName } = useSelector((state) => state.user);
  const userName = `${firstName}`;
  const user = Cookies.get('granusr');
  const { isExpired } = useJwt(user);
  const auth = isExpired;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    Cookies.remove('granusr');
    setAnchorEl(null);
    dispatch(setUserLogin({ isLogin: false }));
    router.push('/');
  };
  return (
    <AppBar position='static'>
      <Toolbar>
        <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
          <div className={styles.main}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'100%'}
              alignItems={'center'}
            >
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
              <Typography
                variant='h1'
                fontSize={'1.27rem'}
                component='div'
                sx={{ flexGrow: 1 }}
              >
                <Link href='/'>GRANTLY</Link>
              </Typography>
              <Stack
                direction={'row'}
                alignItems={'center'}
                width={'100%'}
                justifyContent={'center'}
              >
                <Button color='inherit'>
                  <Link href='/products'>Products</Link>
                </Button>
              </Stack>
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
                    <Button
                      color='inherit'
                      style={{ flexDirection: 'row' }}
                      id='NavUser-button'
                      onClick={handleClick}
                      aria-controls={open ? 'NavUser-Menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? true : undefined}
                    >
                      <Link href='/' style={{ flexDirection: 'row' }}>
                        {userName}
                      </Link>
                    </Button>
                    <Button color='inherit'>
                      <Link href='/'>favs</Link>
                    </Button>
                  </>
                )}
              </Stack>
              <Menu
                id='NavUser-Menu'
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{ 'aria-labelledby': 'NavUser-button' }}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link href={''}>Create a Product</Link>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </Menu>
            </Stack>
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarMUI;
