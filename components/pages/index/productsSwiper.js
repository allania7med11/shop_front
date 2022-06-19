import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { CardProduct } from "../cardProduct";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";

export function ProductsSwiper({ products }) {
  return (
    <Box
      sx={{ backgroundColor: blue[50], py: 4, "& .swiper-wrapper": { px: 4 } }}
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 3,
          },
          1050: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product, key) => (
          <SwiperSlide key={key}>
            <CardProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
