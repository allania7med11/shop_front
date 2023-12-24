import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import { Register } from "@/components/common/register";

export default function Index() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 7 }}>
          <Register />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}