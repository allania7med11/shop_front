import { LoginForm } from "@/components/pages/createOrder/authModal/loginForm";
import { Box, Card, Modal } from "@mui/material"
import { RegisterForm } from "./registerForm";

export const AuthModal = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "32px 48px",
                    gap: "64px",
                    width: "90%",
                    maxWidth: "1200px",
                    outline: "none"
                }}
            >
                <Box sx={{ width: "40%", maxWidth: "400px" }}>
                    <RegisterForm />
                </Box>
                <Box sx={{ width: "40%", maxWidth: "400px" }}>
                    <LoginForm />
                </Box>
            </Card>
        </Modal>
    )
}