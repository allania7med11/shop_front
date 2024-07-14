import * as React from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Box, Button } from "@mui/material";
import { Link } from "@/components/common/Link";
import { useDeleteCartItemMutation } from "@/store/reducer/apis/cartApi";
import { IsCartItemRead } from "@/data/cart";

export const ProductTableCell: React.FC<{ item: IsCartItemRead }> = ({
  item,
}) => {
  const { slug, name, files } = item.product;
  const imageUrl = files.length > 0 ? files[0].url : "";
  const [deleteItem, {}] = useDeleteCartItemMutation();
  return (
    <Box sx={{ display: "flex", px: 1, alignItems: "start", flexWrap: "wrap", gap: "16px" }}>
      <Link href={`/products?slug=${slug}`}>
        <Box
          component="img"
          height="80px"
          width="80px"
          src={imageUrl}
          sx={{ objectFit: "contain" }}
        ></Box>
      </Link>
      <Box>
        <Tooltip title={name} arrow>
          <Typography
            noWrap
            gutterBottom
            variant="h6"
            component="div"
            sx={{ mb: 0, whiteSpace: "wrap" }}
          >
            {name}
          </Typography>
        </Tooltip>
        <Button
          variant="text"
          color="error"
          sx={{ textTransform: "none" }}
          onClick={() => deleteItem(item.id)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};
