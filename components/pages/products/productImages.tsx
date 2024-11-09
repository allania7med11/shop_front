import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { FC, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { IsFile } from '@/data/categories';
import { ProductImageSmall } from './productImageSmall';
import { ProductImageBig } from './productImageBig';

const sxSwiper: SxProps = {
  '& .swiper-slide': { width: '100%' },
  '& .swiper-button-prev, .swiper-button-next': { color: 'black' },
};

export const ProductImages: FC<{
  files: IsFile[];
}> = ({ files }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const updateActiveFileIndex = (index: number): void => {
    if (swiper) {
      swiper.slideTo(index);
    }
    setActiveFileIndex(index);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
      <Box>
        <ProductImageBig file={files[activeFileIndex]} />
      </Box>
      <Box sx={sxSwiper}>
        <Swiper
          onSwiper={setSwiper}
          navigation={true}
          modules={[Navigation]}
          slidesPerView={3}
          onSlideChange={({ activeIndex }) => setActiveFileIndex(activeIndex)}
        >
          {files.map((file, key) => (
            <SwiperSlide key={key}>
              <ProductImageSmall
                index={key}
                file={file}
                activeFileIndex={activeFileIndex}
                updateActiveFileIndex={updateActiveFileIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
