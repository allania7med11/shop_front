import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { FC } from "react";
import { Box } from "@mui/material";
import { IsFile } from "@/data/categories";
import { ProductImageSmall } from "./productImageSmall";

export const ProductImages: FC<{
  files: IsFile[];
}> = ({ files }) => {
  return (
    <Box sx={{ "& .swiper-slide": { width: "100%" } }}>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {files.map((file, key) => (
          <SwiperSlide>
            <ProductImageSmall key={key} file={file} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
