import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { CardProduct } from "../../common/cardProduct";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { IsProduct } from "@/data/categories";
import { FC } from "react";

export const ProductsSwiper: FC<{ products:IsProduct[] }> = ({ products }) => {
  return (
    <Box
      sx={{
        backgroundColor: blue[50],
        py: 4,
        "& .swiper-wrapper": { px: 4, alignItems: "center" },
      }}
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
        {products && products.map((product, key) => (
          <SwiperSlide key={key}>
            <CardProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
