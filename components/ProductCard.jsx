import React from 'react';
import Image from 'next/image';
import defaultImg from '../public/defaultImage.jpg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import styles from '../styles/ProductCard.module.scss';
import { IconButton, Stack, Typography } from '@mui/material';

const ProductCard = ({
  img,
  title = 'Product Title',
  description = 'This one is the description, a large one to test the line break',
  stock = 2,
  Price = 20,
}) => {
  return (
    <div className={styles.ProductCard__Container}>
      <div className={styles.ProductCard__ImgContainer}>
        <Image
          src={img || defaultImg}
          alt='img'
          width='500'
          height='500'
          style={{
            width: '100%',
            height: '100%',
            minWidth: '1rem',
            minHeight: '1rem',
          }}
          loading={'lazy'}
        />
      </div>
      <div className={styles.ProductCard__Body}>
        <Stack
          height='100%'
          direction='column'
          justifyContent={'space-evenly'}
          spacing={0}
          alignItems={'flex-start'}
          style={{ height: '100%' }}
        >
          <Typography
            variant='h2'
            fontSize={'1.1rem'}
            component='div'
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <Typography
            variant='p'
            component='div'
            sx={{ flexGrow: 1, lineBreak: 'normal' }}
          >
            {description}
          </Typography>
          <Typography variant='p' component='div' sx={{ flexGrow: 1 }}>
            {`Stock: ${stock}`}
          </Typography>
          <Stack
            width='100%'
            direction={'row'}
            alignItems={'center'}
            spacing={0}
            justifyContent='space-evenly'
          >
            <Typography
              variant='h3'
              component='div'
              fontSize={'1.06rem'}
              sx={{ flexGrow: 1 }}
            >
              {`$${Price}`}
            </Typography>
            <IconButton
              size='large'
              edge='start'
              style={{
                zIndex: 3,
                background: 'primary',
                border: '2px solid #1976d2',
                marginBottom: '1rem',
              }}
              color='primary'
              aria-label='cart'
            >
              <ShoppingCartIcon />
            </IconButton>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default ProductCard;
