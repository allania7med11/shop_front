import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { CreateOrder } from "@/components/pages/createOrder";
import { CartBreadcrumbs } from "@/components/pages/createOrder/cartStep/cartBreadcrumb";

export default function Index() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <CartBreadcrumbs sx={{ py: 7 }}  />
        <CreateOrder  />
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
