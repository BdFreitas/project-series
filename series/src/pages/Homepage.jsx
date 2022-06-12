import React, { useState } from "react";
import { AppBar, Box, Button, Container, createTheme, Grid, Modal, Paper, styled, Switch, TextareaAutosize, ThemeProvider, Toolbar, Typography, } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from '@mui/icons-material/AssignmentInd';
import MoonIcon from '@mui/icons-material/Brightness3';
import { pink } from "@mui/material/colors";

export default function Homepage() {
    const StyledToolbar = styled(Toolbar)({
        backgroundColor: "primary",
        display: "flex"
    })

    const [mode, setMode] = useState(false);

    const darkTheme = createTheme({
        palette: {
            mode: mode ? "dark" : "light",
            primary: {
                main: pink['A700']
            }
        }
    })

    const [openTutorial, setOpenTutorial] = useState(false);

    const [openFeedback, setOpenFeedback] = useState(false);

    const StyledModal = styled(Modal)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    })

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box bgcolor="background.default" sx={{ minHeight: { xs: "140vh", sm: "130vh", md: "100vh" } }}>
                <AppBar position="sticky">
                    <StyledToolbar>
                        <Grid container display="flex" justifyContent="space-between">
                            <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
                                <Typography variant="h5">Series Management</Typography>
                            </Grid>
                            <Grid item sx={{ display: { xs: "block", sm: "none" }, marginTop: "5px" }}>
                                <LiveTvIcon />
                            </Grid>
                            <Grid item display="flex" alignItems="center">
                                <Button startIcon={<LoginIcon />} color="secondary" variant="contained" href="/login">Login</Button>
                                <Button startIcon={<SignUpIcon />} color="secondary" variant="contained" href="/signin" sx={{ "marginLeft": "10px" }}>Sign up</Button>
                            </Grid>
                        </Grid>
                    </StyledToolbar>
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
                            <Box color="text.primary" variant="h4" mt={2} display="flex" justifyContent="center" alignItems="center">
                            <MoonIcon /><Switch onChange={() => setMode(!mode)} />
                            </Box>
                        </Box>
                    </Container>
                </Box>

                <Container>
                    <Box paddingBottom="60px">
                        <Paper elevation={5}>
                            <Typography variant="h5" component="p" padding={5}>
                                This project was 100% developed by me and it is a 100% only for trainning and portfolio...
                                As I said, it is my first material-ui project ever, so feel free to submit any feedbacks, I am here to learn ;)
                            </Typography>
                        </Paper>
                    </Box>

                    <Box textAlign="center"  sx={{marginBottom: "80px"}}>
                        <Button size="large" color="secondary" variant="outlined" onClick={() => setOpenTutorial(true)}>How to use?</Button>
                        <Button size="large" color="secondary" variant="outlined" sx={{ "marginLeft": "10px" } } onClick={() => setOpenFeedback(true)}>Send me a feedback</Button>
                    </Box>
                </Container>

                <StyledModal 
                open={openTutorial}
                onClose={() => setOpenTutorial(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Paper sx={{ width: { xs:"250px", sm:"400px" }, padding:"30px"}} elevation={25}>
                            <Typography variant="h6" textAlign="center" mb={2}>
                                Tutorial
                            </Typography>
                            <Typography>
                                1. This application has as its on objective, give you tools that will help you to
                                organize yourself with your TVs series or shows. Here, you can list all of them and
                                check how many and which episode you watched, for example.
                                <br/>
                                2. Just create an account and use it, click bellow! 
                            </Typography>
                            <Box textAlign="center" mt={2}>
                                <Button variant="outlined" color="secondary">
                                    Sign up
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </StyledModal>

                <StyledModal 
                open={openFeedback}
                onClose={() => setOpenFeedback(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Paper sx={{ width: { xs:"250px", sm:"400px" }, padding:"30px"}} elevation={25}>
                            <Typography variant="h6" textAlign="center" mb={2}>
                                Feedback
                            </Typography>
                            <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Thanks for helping me!"
                            style={{ width: "100%" }}
                            />
                            <Box textAlign="center" mt={2}>
                                <Button variant="outlined" color="secondary">
                                    Send
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </StyledModal>
            </Box>
        </ThemeProvider>
        </>
    )
}