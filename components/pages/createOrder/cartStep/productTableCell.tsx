import * as React from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { IsProduct } from "@/data/categories";
import { Box, Button } from "@mui/material";
import { Link } from "@/components/common/Link";
import { useDeleteCartItemMutation } from "@/store/reducer/apis/cartApi";

export const ProductTableCell: React.FC<{ product: IsProduct }> = ({
  product,
}) => {
  const { name, files } = product;
  const imageUrl = files.length > 0 ? files[0].url : "";
  const [deleteItem, {}] =
    useDeleteCartItemMutation();
  return (
    <Box sx={{ display: "flex", px: 1, alignItems: "start" }}>
      <Link href={`/products?slug=${product.slug}`}>
        <Box
          component="img"
          height="80px"
          width="80px"
          src={imageUrl}
          sx={{ objectFit: "contain" }}
        ></Box>
      </Link>
      <Box sx={{ padding: "0px 24px" }}>
        <Tooltip title={name} arrow>
          <Typography noWrap gutterBottom variant="h6" component="div" sx={{ mb: 0 }}>
            {name}
          </Typography>
        </Tooltip>
        <Button variant="text" color="error" sx={{ textTransform: "none" }} onClick={() => deleteItem(product.cart_item.id)}>
          Remove
        </Button>
      </Box>
    </Box>
  );
};
