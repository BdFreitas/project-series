import React, { useState } from "react";
import { AppBar, Box, Button, Container, createTheme, Grid, Paper, styled, Switch, ThemeProvider, Toolbar, Typography, } from '@mui/material';
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

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box bgcolor="background.default" height="100vh">
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
                                <Button startIcon={<LoginIcon />} color="secondary" variant="contained">Login</Button>
                                <Button startIcon={<SignUpIcon />} color="secondary" variant="contained" sx={{ "marginLeft": "10px" }}>Sign up</Button>
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

                    <Box textAlign="center" mt={5}>
                        <Button size="large" color="secondary" variant="contained">How to use?</Button>
                        <Button size="large" color="secondary" variant="contained" sx={{ "marginLeft": "10px" }}>Send me a feedback</Button>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
        </>
    )
}