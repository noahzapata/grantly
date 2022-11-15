import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

import React from 'react';

const NavBarMUI = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <PaletteIcon />
          <Typography variant='h6' component='div'>
            GRANTLY
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarMUI;
