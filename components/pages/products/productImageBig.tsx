import { FC } from 'react';
import { Box, CardMedia, Paper, SxProps } from '@mui/material';
import { IsFile } from '@/data/categories';

const sxPaperContainer: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  padding: '8px',
  height: '40vh',
  maxHeight: '500px',
};

export const ProductImageBig: FC<{
  file: IsFile;
}> = ({ file }) => {
  return (
    <Box sx={sxPaperContainer}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '8px',
        }}
      >
        <CardMedia
          component="img"
          alt="product img"
          image={file.url}
          sx={{ objectFit: 'contain' }}
        />
      </Paper>
    </Box>
  );
};
