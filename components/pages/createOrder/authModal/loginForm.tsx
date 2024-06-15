import useErrors from "@/hooks/useErrors";
import { useLoginMutation } from "@/store/reducer/apis/authApi";
import { Alert, Box, Button, CircularProgress, InputLabel, Link, SxProps, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormTextField from "../../../common/Form/formTextField";
import FormPasswordField from "../../../common/Form/formPasswordField";
import { blue } from "@mui/material/colors";


const sxAuthButton: SxProps = { textTransform: "none" };

export const LoginForm = () => {
    const { control, handleSubmit, setError, clearErrors, getValues } = useForm();
    const [login, { isLoading, error, isSuccess }] = useLoginMutation(); // Destructure the login mutation and loading state
    const { globalErrors, setGlobalErrors } = useErrors(
        error,
        setError,
        getValues
    );

    const onSubmit = async (form_data) => {
        clearErrors();
        setGlobalErrors([]);
        await login(form_data);
    };
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Box sx={{ pb: 2 }}>
                <Typography variant="h6">Order with an existing account</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, my: "8px" }}
                >
                    {globalErrors &&
                        globalErrors.map((error, key) => (
                            <Alert key={key} severity="error">
                                {error}
                            </Alert>
                        ))}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <FormTextField
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Email is required" }}
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <FormPasswordField
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Password is required" }}
                            id="password"
                            placeholder="********"
                            variant="outlined"
                            fullWidth
                        />
                        <Link href="/auth/forget_password/" underline="none" color={blue[900]} sx={{ pt: 1 }}>
                            Forgot password?
                        </Link>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={isLoading || isSuccess} sx={sxAuthButton}>
                        {isLoading || isSuccess ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}