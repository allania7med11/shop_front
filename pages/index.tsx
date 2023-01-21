import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { PageTitle } from "@/components/common/pageTitle";
import { Categories } from "@/components/pages/index/categories";
import { useCategoriesQuery } from "@/store/reducer/apis/productApi";
import { Loading } from "@/components/common/loading";
import { Warning } from "@/components/common/warning";

export default function Index() {
  const { data, error, isLoading } = useCategoriesQuery();
  let categories = data ? data : [];
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <PageTitle sx={{ py: 7 }}>
          Discover Our Products and Categories
        </PageTitle>
        {isLoading &&  <Loading />}
        {error && <Warning />}
        {categories && <Categories categories={categories} />}
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
