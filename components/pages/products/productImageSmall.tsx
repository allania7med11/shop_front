import { FC } from "react";
import { Box, CardMedia, Paper, SxProps } from "@mui/material";
import { IsFile } from "@/data/categories";
import { blue, grey } from "@mui/material/colors";

const sxPaperDefault: SxProps = {
  display: "flex",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  padding: "8px",
  border: `1px solid ${grey[400]}`
};
const sxPaperActive: SxProps = {
  border: `1px solid ${blue[800]}`,
  boxShadow: `0px 3px 3px -2px ${blue[800]}, 0px 3px 4px 0px ${blue[800]}, 0px 1px 8px 0px ${blue[800]}`,
};

export const ProductImageSmall: FC<{
  file: IsFile;
  index: number;
  activeFileIndex: number;
  updateActiveFileIndex:(index: number) => any
}> = ({ file, index, activeFileIndex, updateActiveFileIndex }) => {
  const sxPaper =
    activeFileIndex == index
      ? { ...sxPaperDefault, ...sxPaperActive }
      : sxPaperDefault;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" }}>
      <Paper elevation={3} sx={sxPaper} onClick={() => updateActiveFileIndex(index)}>
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
