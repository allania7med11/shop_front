import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import { ResetPasswordConfirm } from "@/components/common/resetPasswordConfirm";

export default function Index() {
  useRedirectIfLoggedIn()
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 7 }}>
          <ResetPasswordConfirm />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}