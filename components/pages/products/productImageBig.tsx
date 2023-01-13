import { FC } from "react";
import { Box, CardMedia, Paper } from "@mui/material";
import { IsFile } from "@/data/categories";

export const ProductImageBig: FC<{
  file: IsFile;
}> = ({ file }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "8px",
          height: "50vh",
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
