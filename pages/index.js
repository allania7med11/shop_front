import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { PageTitle } from "components/common/pageTitle";
import { Categories } from "components/pages/index/categories";
import { useCategoriesRead } from "hooks/api/categories";

export default function Index() {
  const { data } = useCategoriesRead();
  let categories = data ? data : [];
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <PageTitle sx={{ py: 7 }}>
          Discover Our Products and Categories
        </PageTitle>
        {categories && <Categories categories={categories} />}
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
