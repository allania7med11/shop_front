import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { Login } from "@/components/common/login";

export default function Index() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 7 }}>
          <Login />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
