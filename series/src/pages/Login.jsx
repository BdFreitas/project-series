import { Button, Typography, Box, Paper, createTheme, TextField, ThemeProvider, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { pink } from "@mui/material/colors";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect } from "react";
import api from "../api";

export default function Login() {
    //Navigator
    const navigator = useNavigate();

    //Theme
    const darkTheme = createTheme({
        palette: {
            mode: sessionStorage.getItem("mode") === "true" ? "dark" : "light",
            primary: {
                main: pink['A700']
            }
        }
    })

    //Form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Auth request
    function auth() {
        const user = {
            "email": email,
            "password": password
        }

        api.post("/users/authentication", user)
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.setItem("idUser", response.data.idUser);
                    sessionStorage.setItem("email", response.data.email);
                    navigator("/series");
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    showAlert(
                        "error",
                        "Incorrect email/password."
                    )
                } else if (error.response.status === 400) {
                    showAlert(
                        "error",
                        "Incorrect fields."
                    )
                } else {
                    showAlert(
                        "error",
                        "CRITICAL: Unkown error."
                    )
                }
            })
    }

    //Snackbar alerts
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    function showAlert(severity, message) {
        setSeverity(severity);
        setMessage(message);
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false);
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box alignItems={"center"} display={"flex"} bgcolor="background.default" justifyContent="center" height={"100vh"}>
                    <Paper elevation={7} sx={{ width: 380, height: 430, borderRadius: 5, padding: 7 }}>
                        <Typography variant="h4" display="flex" justifyContent="space-between">
                            <HomeIcon onClick={() => navigator("/")} sx={{ mt: "10px", cursor: "pointer" }} />
                            Login
                            <LoginIcon sx={{ mt: "10px" }} />
                        </Typography>

                        <TextField
                            label="Email"
                            color="primary"
                            variant="filled"
                            sx={{ width: "100%", margin: "20px 0" }}
                            onInput={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            color="primary"
                            variant="filled"
                            sx={{ width: "100%", margin: "20px 0 40px 0" }}
                            type="password"
                            onInput={(e) => setPassword(e.target.value)}
                        />

                        <Box marginTop="20px">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ width: "100%" }}
                                onClick={() => auth()}
                            >
                                Login
                            </Button>
                            <Typography
                                fontSize="small"
                                textAlign="center"
                                mt={2}
                                sx={{ cursor: "pointer" }}
                            >
                                <u onClick={() => navigator("/sign-up")}>Dont have an account? Click here!</u>
                            </Typography>
                        </Box>
                    </Paper>

                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        autoHideDuration={2500}
                    >
                        <Alert
                            variant="filled"
                            sx={{ minWidth: "200px" }}
                            onClose={handleClose}
                            severity={severity}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
            </ThemeProvider>
        </>
    )
}