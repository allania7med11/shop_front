import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export const CardProduct = ({ product }) => (
    <Card sx={{ maxWidth: 220 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={ product.image }
            sx={{ objectFit: "contain" }}
        />
        <CardContent>
            <Tooltip title={ product.name } arrow>
                <Typography noWrap gutterBottom variant="body1" component="div">
                    { product.name }
                </Typography>
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
                { product.price }
            </Typography>
        </CardContent>
    </Card>
);
