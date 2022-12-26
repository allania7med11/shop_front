import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { PageTitle } from "@/components/common/pageTitle";
import { useRouter } from "next/router";
import { useCategoryRead } from "@/hooks/api/categories";
import { Category } from "@/components/pages/index/category";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  let category = null;
  if (slug) {
    const { data } = useCategoryRead(slug);
    category = data;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <PageTitle sx={{ py: 7 }}>category page</PageTitle>
        {category && <Category category={category} />}
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
