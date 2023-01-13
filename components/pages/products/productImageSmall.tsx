import { FC } from "react";
import { Box, CardMedia, Paper } from "@mui/material";
import { IsFile } from "@/data/categories";

export const ProductImageSmall: FC<{
  file: IsFile;
}> = ({ file }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "50px",
          height: "50px",
          padding: "8px",
        }}
      >
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
