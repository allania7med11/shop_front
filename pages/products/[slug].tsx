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
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {isSuccess && (
            <Box
              sx={{
                flexBasis: "300px",
                minWidth: "300px",
                maxWidth: "500px",
                flexGrow: 1,
              }}
            >
              <ProductImages files={product.files} />
            </Box>
          )}
          {isSuccess && (
            <Box sx={{ flexBasis: "350px", minWidth: "350px", flexGrow: 5 }}>
              <ProductInfos product={product} />
            </Box>
          )}
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}