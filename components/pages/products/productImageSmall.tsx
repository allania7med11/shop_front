import { FC } from "react";
import { Box, CardMedia, Paper, SxProps } from "@mui/material";
import { IsFile } from "@/data/categories";

const sxPaper: SxProps = {
  display: "flex",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  padding: "8px",
};

export const ProductImageSmall: FC<{
  file: IsFile;
}> = ({ file }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" }}>
      <Paper elevation={3} sx={sxPaper}>
        <CardMedia
          component="img"
          alt="product img"
          image={file.url}
          sx={{ objectFit: "contain" }}
        />
      </Paper>
    </Box>
  );
};
