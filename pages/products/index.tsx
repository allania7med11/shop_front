import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { ProductBreadcrumbs } from "@/components/pages/products/productBreadcrumbs";
import { ProductInfos } from "@/components/pages/products/productInfos";
import { ProductImages } from "@/components/pages/products/productImages";
import { useProductQuery } from "@/store/reducer/apis/productApi";
import { FetchWrap } from "@/components/common/fetchWrap";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useProductQuery(slug, {
    skip: !slug,
  });
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <ProductBreadcrumbs sx={{ py: 7 }} product={data} />
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              flexBasis: "300px",
              minWidth: "300px",
              maxWidth: "500px",
              flexGrow: 1,
            }}
          >
            <FetchWrap isLoading={isLoading} error={error} data={data}>
              <ProductImages files={data && data.files} />
            </FetchWrap>
          </Box>

          <Box sx={{ flexBasis: "350px", minWidth: "350px", flexGrow: 5 }}>
            <FetchWrap isLoading={isLoading} error={error} data={data}>
              <ProductInfos product={data} />
            </FetchWrap>
          </Box>
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
