import React, { useState } from "react";
import { AppBar, Box, Button, Container, createTheme, Grid, styled, ThemeProvider, Toolbar, Typography, } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from '@mui/icons-material/AssignmentInd';
import { display } from "@mui/system";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const StyledToolbar = styled(Toolbar)({
    backgroundColor: "#DA70D6",
    display: "flex"
})

export default function Homepage() {
    const [mode, setMode] = useState("dark");

    const darkTheme = createTheme({
        palette: {
            mode: mode,
            background: {
                default: "#000"
            } 
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="sticky">
                    <StyledToolbar>
                        <Grid container display="flex" justifyContent="space-between">
                            <Grid item sx={{ display: { xs: "none", sm: "block" }}}>
                                <Typography variant="h5">Series Management</Typography>
                            </Grid>
                            <Grid item sx={{ display: { xs: "block", sm: "none" }, marginTop: "5px" }}>
                                <LiveTvIcon/>
                            </Grid>
                            <Grid item>
                                <Button startIcon={ <LoginIcon/> } color="primary" variant="contained">Login</Button>
                                <Button startIcon={ <SignUpIcon/> } color="secondary" variant="contained" sx={{"marginLeft": "10px"}}>Sign up</Button>
                            </Grid>
                        </Grid>
                    </StyledToolbar>
                </AppBar>

                <Box sx={{ bgcolor: "lightpink", border: "2 solid black" }}>
                    <Container>
                        <Box padding="120px 0">
                            <Typography variant="h1" textAlign="center">
                                Hello!
                            </Typography>
                            <Typography variant="h4" textAlign="center">
                                Welcome to my first project using Material-UI
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                <Container>
                    <Box padding="60px 0">
                        <Typography variant="h5" component="p">
                            This project was 100% developed by me and it is a 100% only for trainning and portfolio... 
                            As I said, it is my first material-ui project ever, so feel free to submit any feedbacks, I am here to learn ;)
                        </Typography>
                    </Box>

                    <Box textAlign="center" mt={5}>
                        <Button size="large" color="secondary" variant="contained">How to use?</Button>
                        <Button size="large" color="secondary" variant="contained" sx={{"marginLeft": "10px"}}>Send me a feedback</Button>
                    </Box>
                </Container>
        </ThemeProvider>
    )
}