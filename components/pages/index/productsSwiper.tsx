import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { CardProduct } from '../../common/cardProduct';
import { blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { IsProduct } from '@/data/categories';
import { FC } from 'react';

export const ProductsSwiper: FC<{ products: IsProduct[] }> = ({ products }) => {
  return (
    <Box
      sx={{
        backgroundColor: blueGrey[50],
        py: 4,
        '& .swiper-wrapper': { px: 4, alignItems: 'center' },
      }}
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          620: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {products &&
          products.map((product, key) => (
            <SwiperSlide key={key}>
              <CardProduct product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
