import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { FC, useState } from "react";
import { Box } from "@mui/material";
import { IsFile } from "@/data/categories";
import { ProductImageSmall } from "./productImageSmall";
import { ProductImageBig } from "./productImageBig";

export const ProductImages: FC<{
  files: IsFile[];
}> = ({ files }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProductImageBig file={files[activeFileIndex]} />
      <Box sx={{ "& .swiper-slide": { width: "100%" } }}>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={3}
          onSlideChange={({ activeIndex }) => setActiveFileIndex(activeIndex)}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {files.map((file, key) => (
            <SwiperSlide>
              <ProductImageSmall key={key} index={key} file={file} activeFileIndex={activeFileIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
