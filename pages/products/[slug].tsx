import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useProductRead } from "@/hooks/api/categories";
import { ProductBreadcrumbs } from "@/components/pages/products/productBreadcrumbs";
import { CardProduct } from "@/components/common/cardProduct";
import { ProductInfos } from "@/components/pages/products/productInfos";

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
            flexWrap: { xs: "wrap", b550: "nowrap" },
          }}
        >
          {isSuccess && <ProductInfos product={product} />}
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
