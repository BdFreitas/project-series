import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Container, createTheme, Divider, Fab, Grid, IconButton, Menu, MenuItem, Modal, Paper, Step, StepLabel, Stepper, styled, Switch, TextField, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import MoonIcon from '@mui/icons-material/Brightness3';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

export default function Series() {
    const navigator = useNavigate();

    // Theme
    const [mode, setMode] = useState(false);

    const darkTheme = createTheme({
        palette: {
            mode: sessionStorage.getItem("mode") === "true" ? "dark" : "light",
            primary: {
                main: pink['A700']
            }
        }
    })

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Switch - Dark Theme
    function verifySwitch() {
        if (sessionStorage.getItem("mode") === 'true') {
            return (
                <Switch
                    checked
                    onChange={() => {
                        sessionStorage.setItem("mode", !mode);
                        setMode(!mode);
                    }}
                />
            );
        }
        return (
            <Switch
                onChange={() => {
                    sessionStorage.setItem("mode", !mode);
                    setMode(!mode);
                }}
            />
        );
    }

    // Modal stuff
    const StyledModal = styled(Modal)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    })

    const [openAddSerie, setOpenAddSerie] = useState(false);

    // Stepper stuff
    const [activeStep, setActiveStep] = useState(0);

    const [backButtonState, setBackButtonState] = useState(true);
    const [nextButtonState, setNextButtonState] = useState(false);

    function checkStep()
    {
        if (activeStep === 0) {
            setStepOneDisplay("");
            setStepTwoDisplay("none");
            setStepThreeDisplay("none");
            return;
        }

        if (activeStep === 1) {
            setStepOneDisplay("none");
            setStepTwoDisplay("");
            setStepThreeDisplay("none");
            return;
        }

        if (activeStep === 2) {
            setStepOneDisplay("none");
            setStepTwoDisplay("none");
            setStepThreeDisplay("");
            return;
        }

        if (activeStep === 3) {
            setStepOneDisplay("none");
            setStepTwoDisplay("none");
            setStepThreeDisplay("none");
            return;
        }
    }

    const previousStep = () => {
        setActiveStep((currentStep) => currentStep - 1);
        setNextButtonState(false);
        checkStep();

        if (activeStep === 1) {
            setBackButtonState(true);
        }
    }

    const nextStep = () => {
        setActiveStep((currentStep) => currentStep + 1);
        setBackButtonState(false);
        checkStep();

        if (activeStep === 2) {
            setNextButtonState(true);
        }
    }

    const [stepOneDisplay, setStepOneDisplay] = useState("")

    const [stepTwoDisplay, setStepTwoDisplay] = useState("none")

    const [stepThreeDisplay, setStepThreeDisplay] = useState("none")


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                {/*Background*/}
                <Box
                    bgcolor="background.default"
                    height="100vh"
                >
                    {/*Navbar*/}
                    <AppBar position="sticky">
                        <Container>
                            <Toolbar>
                                <Grid container display="flex" justifyContent="space-between">
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
                                    <Grid item display="flex" alignItems="center">
                                        <Tooltip title="Profile">
                                            <IconButton
                                                onClick={handleClick}
                                                aria-controls={open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                <Avatar sx={{ heigth: "4px" }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 23,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem>
                                                <Avatar />
                                                <Typography>My account</Typography>
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem>
                                                <MoonIcon color="action" />
                                                {
                                                    verifySwitch()
                                                }
                                            </MenuItem>
                                            <MenuItem>
                                                <Logout color="action" />
                                                {/*
                                            The best way is to don't use margin, but ListItemIcon tag instead...
                                            I didn't use it here, because it would make the Switch tag's alignment
                                            weird.
                                            */}
                                                <Typography ml={1.4}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </AppBar>

                    {/*Content*/}
                    <Container>
                        <Box textAlign="center" mt={7}>
                            <Typography variant="h4" color="text.primary">
                                Seems there is nothing to be shown for you, yet...
                            </Typography>
                            <Typography color="text.primary">
                                Click at the bottom "+" button to add your first serie!
                            </Typography>
                        </Box>

                        {/*Adding series feature*/}
                        <Tooltip title="Add a serie">
                            <Fab
                                onClick={() => setOpenAddSerie(true)}
                                color="secondary"
                                aria-label="add"
                                sx={{
                                    position: "fixed",
                                    bottom: "10%",
                                    right: "20%"
                                }}
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>

                        <StyledModal
                            open={openAddSerie}
                            onClose={() => setOpenAddSerie(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Paper
                                sx={{ 
                                    height: "380px",
                                    width: "30%",
                                    padding: "20px"
                                }}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Stepper orientation="vertical" activeStep={activeStep}>
                                        <Step>
                                            <StepLabel>Serie's name and amount of Seasons</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Amount of seasons</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Amount of episodes</StepLabel>
                                        </Step>
                                    </Stepper>

                                    {/*Step 1*/}
                                    <Box
                                    // padding={1.2}
                                    display={stepOneDisplay}
                                    >
                                        <Typography mt={1} mb={1}>Type bellow its name:</Typography>
                                        <TextField label="fase 1"/>
                                    </Box>

                                    {/*Step 2*/}
                                    <Box
                                    padding={1.2}
                                    display={stepTwoDisplay}
                                    >
                                        <Typography mt={1} mb={1}>Type bellow its name:</Typography>
                                        <TextField label="fase 2" type="number"/>
                                    </Box>

                                    {/*Step 3*/}
                                    <Box
                                    padding={1.2}
                                    display={stepThreeDisplay}
                                    >
                                        <Typography mt={1} mb={1}>Type bellow its name:</Typography>
                                        <TextField label="fase 3"/>
                                    </Box>
                                </Box>

                                <Box
                                    // border={1}
                                    display="flex"
                                    justifyContent="space-between"
                                    mt={5}
                                >
                                    <Button
                                        onClick={() => previousStep()}
                                        disabled={backButtonState}
                                    >
                                        Back
                                    </Button>
                                    
                                    <Button
                                        onClick={() => nextStep()}
                                        disabled={nextButtonState}
                                    >
                                        Next
                                    </Button>
                                </Box>                           
                            </Paper>
                        </StyledModal>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    );
}