import { LoginForm } from "@/components/pages/createOrder/authModal/loginForm";
import { Box, Card, Fab, IconButton, Modal } from "@mui/material"
import { RegisterForm } from "./registerForm";
import { grey } from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';

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
                    padding: "32px 48px 72px 48px",
                    gap: "64px",
                    width: "90%",
                    maxWidth: "1200px",
                    outline: "none"
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ width: "40%", maxWidth: "400px", pt: "20px" }}>
                    <RegisterForm />
                </Box>
                <Box sx={{ backgroundColor: grey[300], width: "2px" }}>
                    <Fab
                        sx={{
                            position: "absolute",
                            top: "25%",
                            left: "50%",
                            transform: "translate(-50%, -25%)",
                            backgroundColor: grey[200],
                            color: grey[700],
                        }}>
                        OR
                    </Fab>
                </Box>
                <Box sx={{ width: "40%", maxWidth: "400px", pt: "20px" }}>
                    <LoginForm />
                </Box>
            </Card>
        </Modal>
    )
}