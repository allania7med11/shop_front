import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Category } from "@/components/pages/categories/category";
import { CategoryBreadcrumbs } from "@/components/pages/categories/categoyBreadcrumb";
import { Filters } from "@/components/pages/categories/filters";
import { useCategoryQuery } from "@/store/reducer/apis/productApi";
import { FetchWrap } from "@/components/common/fetchWrap";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useCategoryQuery(slug);
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <CategoryBreadcrumbs sx={{ py: 7 }} category={data} />
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            flexWrap: { xs: "wrap", b550: "nowrap" },
          }}
        >
          <Filters category={data} sx={{ minWidth: "225px", flexGrow: 1 }} />
          <Category
            sx={{ minWidth: "275px", flexGrow: 10, maxWidth: "100vw" }}
          />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
