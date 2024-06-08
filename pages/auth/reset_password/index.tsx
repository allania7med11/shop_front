import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "src/Copyright";
import Box from "@mui/material/Box";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import { ResetPasswordConfirm } from "@/components/common/resetPasswordConfirm";
import { CustomBreadcrumbs, IsUrl } from "@/components/common/customBreadcrumb";
import { useRouter } from "next/router";

export default function Index() {
  useRedirectIfLoggedIn()
  const router = useRouter();
  const urls: IsUrl[] = [{ name: "Home", href: `/` }, { name: "Reset Password ", href: router.asPath }];
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <CustomBreadcrumbs sx={{ pt: 2 }} urls={urls} />
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
          <ResetPasswordConfirm />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}