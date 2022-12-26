import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { PageTitle } from "@/components/common/pageTitle";
import { useRouter } from "next/router";
import { useCategoryRead } from "@/hooks/api/categories";
import { Category } from "@/components/pages/categories/category";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { status, data } = useCategoryRead(slug, router.isReady);
  const category = data;
  if (status === "idle") {
    return ;
  }
  if (status === "loading") {
    return <p>Loading data...</p>;
  }
  if (status === "error") {
    return <p>Error fetching data</p>;
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
