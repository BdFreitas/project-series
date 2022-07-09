import { Button, Typography, Box, Paper, createTheme, TextField, ThemeProvider, Snackbar, Alert, Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { pink } from "@mui/material/colors";
import SignUpIcon from "@mui/icons-material/AssignmentInd";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
import api from "../api";

export default function SignUp() {
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
    const [confirmedPassword, setConfirmedPassword] = useState("");

    //Sign-up request
    function signUp() {
        if (password === "" || confirmedPassword === "" || email === "") {
            let severity = "warning";
            let message = "All the fields must be filled!"
            showAlert(severity, message);
            return;
        }
        if (password !== confirmedPassword) {
            let severity = "warning";
            let message = "The passwords must be matching!"
            showAlert(severity, message);
            return;
        }

        let user = {
            "email": email,
            "password": password
        }

        setOpenBackdrop(true);

        api
            .post("/users", user)
            .then((response) => {
                if (response.status === 201) {
                    setOpenBackdrop(false);

                    sessionStorage.setItem("idUser", response.data.idUser);
                    sessionStorage.setItem("email", response.data.email);
                    navigator("/series");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setOpenBackdrop(false);

                    showAlert(
                        "error",
                        "This email is not valid!"
                    )
                }
                if (error.response.status === 409) {
                    setOpenBackdrop(false);

                    showAlert(
                        "error",
                        "This email is alreay in use."
                    )
                }
            })
    }

    //Snackbar alerts
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    function showAlert(severity, message)
    {
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

    //Backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box
                    alignItems={"center"}
                    display={"flex"}
                    bgcolor="background.default"
                    justifyContent="center"
                    height={"100vh"}
                >
                    <Paper
                        elevation={7}
                        sx={{
                            width: 380,
                            height: 430,
                            borderRadius: 5,
                            padding: 7
                        }}
                    >
                        <Typography
                            variant="h4"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <HomeIcon
                                onClick={() => navigator("/")}
                                sx={{
                                    mt: "10px",
                                    cursor: "pointer"
                                }}
                            />
                            Sign Up
                            <SignUpIcon sx={{ mt: "10px" }} />
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
                            sx={{
                                width: "100%",
                                margin: "20px 0"
                            }}
                            type="password"
                            onInput={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm password"
                            color="primary"
                            variant="filled"
                            sx={{
                                width: "100%",
                                margin: "20px 0"
                            }}
                            type="password"
                            onInput={(e) => setConfirmedPassword(e.target.value)}
                        />

                        <Box marginTop="20px">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ width: "100%" }}
                                onClick={() => signUp()}
                            >
                                Create account
                            </Button>
                            <Typography
                                fontSize="small"
                                textAlign="center"
                                mt={2}
                                sx={{ cursor: "pointer" }}
                            >
                                <u onClick={() => navigator("/login")}>
                                    Already have and account? Click here!
                                </u>
                            </Typography>
                        </Box>
                    </Paper>

                    {/*snackbarAlerts*/}
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

                    {/* Backdrop */}
                    {/* Backdrop */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </ThemeProvider>
        </>
    )
}