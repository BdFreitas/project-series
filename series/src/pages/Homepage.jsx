import React, { useState, useEffect } from "react";
import { Alert, AppBar, Box, Button, Container, createTheme, Grid, Modal, Paper, Snackbar, styled, Switch, TextareaAutosize, ThemeProvider, Toolbar, Typography, } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from '@mui/icons-material/AssignmentInd';
import MoonIcon from '@mui/icons-material/Brightness3';
import { pink } from "@mui/material/colors";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const StyledToolbar = styled(Toolbar)({
        backgroundColor: "primary",
        display: "flex"
    })

    useEffect(() => {
        sessionStorage.setItem("mode", false);
    }, [])

    const [mode, setMode] = useState(false);

    const darkTheme = createTheme({
        palette: {
            mode: mode ? "dark" : "light",
            primary: {
                main: pink['A700']
            }
        }
    })

    //Tutorial modal
    const [openTutorial, setOpenTutorial] = useState(false);

    //Feedback modal
    const [openFeedback, setOpenFeedback] = useState(false);

    //Feedback request
    const [feedback, setFeedback] = useState("");

    function clearConsts() {
        setFeedback("");
    }

    function sendFeedback() {
        let severity;
        let message;

        if (feedback === "") {
            severity = "warning";
            message = "The feedback's text-area can't be empty!"

            showAlert(
                severity,
                message
            )

            return;
        };

        let feedbacks = {
            "feedback": feedback
        };

        api
        .post("/feedbacks", feedbacks)
        .then((response) => {
            if (response.status === 201) {
                severity = "success";
                message = "Feedback has been sent successfuly! Thank you ;)";

                setOpenFeedback(false);

                showAlert(
                    severity,
                    message
                );
            };
        })
        .catch((error) => {
            showAlert(
                severity = "error",
                message = "CRITICAL: Unknown error!"
            )
        })
    }

    //Snackbar alerts
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    function showAlert(severity, message) {
        setSeverity(severity);
        setMessage(message);
        setOpenAlert(true);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenAlert(false);
    }

    //Verifying auth
    const navigator = useNavigate();

    useEffect(() => {
        let email = sessionStorage.getItem("email");
        let idUser = sessionStorage.getItem("idUser");

        if (idUser > 0 && email.length > 0) {
            navigator("/series");
        }
    }, []);


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box
                    bgcolor="background.default"
                    sx={{ minHeight: { xs: "140vh", sm: "130vh", md: "100vh" } }}
                >
                    <AppBar position="sticky">
                        <Container>
                            <StyledToolbar>
                                <Grid
                                    container
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Grid
                                        item
                                        alignItems="center"
                                        sx={{ display: { xs: "none", sm: "flex" } }}
                                    >
                                        <Typography variant="h5">Series Management</Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        alignItems="center"
                                        sx={{ display: { xs: "flex", sm: "none" } }}
                                    >
                                        <LiveTvIcon />
                                    </Grid>
                                    <Grid
                                        item
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Button
                                            startIcon={<LoginIcon />}
                                            color="secondary"
                                            variant="contained"
                                            href="/login"
                                        >
                                            Login
                                        </Button>

                                        <Button
                                            startIcon={<SignUpIcon />}
                                            color="secondary"
                                            variant="contained"
                                            href="/sign-up"
                                            sx={{ "marginLeft": "10px" }}
                                        >
                                            Sign up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </StyledToolbar>
                        </Container>
                    </AppBar>

                    <Box sx={{ border: "2 solid black" }}>
                        <Container>
                            <Box padding="120px 0" align>
                                <Typography color="text.primary" variant="h1" textAlign="center">
                                    Hello!
                                </Typography>
                                <Typography color="text.primary" variant="h4" textAlign="center">
                                    Welcome to my first Material-UI project!
                                </Typography>
                                <Box
                                    color="text.primary"
                                    variant="h4"
                                    mt={2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <MoonIcon /><Switch onChange={() => { sessionStorage.setItem("mode", !mode); setMode(!mode); }} />
                                </Box>
                            </Box>
                        </Container>
                    </Box>

                    <Container>
                        <Box paddingBottom="60px">
                            <Paper elevation={5}>
                                <Typography variant="h5" component="p" padding={5} textAlign="center">
                                    This project was 100% developed by me and only for trainning and portfolio...
                                    As I said, it is my first material-ui project ever, so feel free to submit any feedbacks, I am here to learn ;)
                                </Typography>
                            </Paper>
                        </Box>

                        <Box textAlign="center" paddingBottom={10}>
                            <Button
                                size="large"
                                color="secondary"
                                variant="outlined"
                                onClick={() => setOpenTutorial(true)}
                            >
                                How to use?
                            </Button>

                            <Button
                                size="large"
                                color="secondary"
                                variant="outlined"
                                sx={{ "marginLeft": "10px" }}
                                onClick={() => {
                                    setOpenFeedback(true);
                                    clearConsts();
                                }}
                            >
                                Send me a feedback
                            </Button>
                        </Box>
                    </Container>

                    <Modal
                        open={openTutorial}
                        onClose={() => setOpenTutorial(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Paper
                                sx={{ width: { xs: "250px", sm: "400px" }, padding: "30px" }}
                                elevation={24}
                            >
                                <Typography variant="h6" textAlign="center" mb={2}>
                                    Tutorial
                                </Typography>
                                <Typography>
                                    1. This application has as its on objective, give you tools that will help you to
                                    organize yourself with your TVs series or shows. Here, you can list all of them and
                                    check how many and which episode you watched, for example.
                                    <br />
                                    2. Just create an account and use it, click bellow!
                                </Typography>
                                <Box textAlign="center" mt={2}>
                                    <Button href="/sign-up" variant="outlined" color="secondary">
                                        Sign up
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Modal>

                    <Modal
                        open={openFeedback}
                        onClose={() => setOpenFeedback(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Paper sx={{ width: { xs: "250px", sm: "400px" }, padding: "30px" }} elevation={24}>
                                <Typography variant="h6" textAlign="center" mb={2}>
                                    Feedback
                                </Typography>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={10}
                                    placeholder="Thanks for helping me!"
                                    style={{ width: "100%" }}
                                    onInput={(e) => setFeedback(e.target.value)}
                                />
                                <Box textAlign="center" mt={2}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => sendFeedback()}    
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Modal>

                    {/* Snackbar alerts */}
                    <Snackbar
                        open={openAlert}
                        onClose={handleCloseAlert}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        autoHideDuration={3000}
                    >
                        <Alert
                            variant="filled"
                            sx={{ minWidth: "200px" }}
                            onClose={handleCloseAlert}
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
