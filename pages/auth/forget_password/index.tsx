import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import { Reminder } from "@/components/common/reminder";
import { ForgetPassword } from "@/components/common/forgetPassword";

export default function Index() {
  useRedirectIfLoggedIn()
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 7 }}>
          <ForgetPassword />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          <Reminder
            message="Don’t have an account?"
            link="/auth/register"
            linkText="Sign up"
          />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}