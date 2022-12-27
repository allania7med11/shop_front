import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useCategoryRead } from "@/hooks/api/categories";
import { Category } from "@/components/pages/categories/category";
import { CategoryBreadcrumbs } from "@/components/pages/categories/categoyBreadcrumb";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { status, data } = useCategoryRead(slug, router.isReady);
  const category = data;
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <CategoryBreadcrumbs sx={{ py: 7 }} category={category} />
        {category && <Category category={category} status={status} />}
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
