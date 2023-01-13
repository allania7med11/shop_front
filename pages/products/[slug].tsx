import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useProductRead } from "@/hooks/api/categories";
import { ProductBreadcrumbs } from "@/components/pages/products/productBreadcrumbs";
import { ProductInfos } from "@/components/pages/products/productInfos";
import { ProductImages } from "@/components/pages/products/productImages";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { isSuccess, data } = useProductRead(slug, router.isReady);
  const product = data;
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <ProductBreadcrumbs sx={{ py: 7 }} product={product} />
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "stretch"
          }}
        >
          {isSuccess && (
            <Box sx={{ width: "40%"}}>
              <ProductImages files={product.files} />
            </Box>
          )}
          {isSuccess && (
            <Box sx={{ width: "60%"}}>
              <ProductInfos product={product} />
            </Box>
          )}
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
