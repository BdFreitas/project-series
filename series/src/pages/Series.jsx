import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Container, createTheme, Divider, Fab, Grid, IconButton, Menu, MenuItem, Modal, Paper, Stack, styled, Switch, TextField, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import MoonIcon from '@mui/icons-material/Brightness3';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Serie from "../components/Serie";

export default function Series()
{
    // Navigator
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

    // Content - displays
    const [series, setSeries] = useState([""]);

    const [noContentDisplay, setNoContentDisplay] = useState("none");
    const [seriesDisplay, setSeriesDisplay] = useState("none");

    useEffect(() => {
        if (series.length > 0) {
            setSeriesDisplay("");
            return;
        }

        setNoContentDisplay("");
    }, series)

    // Add serie's modal
    const StyledModal = styled(Modal)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    })

    const [openAddSerie, setOpenAddSerie] = useState(false);

    // My account modal
    const [openMyAccount, setOpenMyAccount] = useState(false);


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                {/*Background*/}
                <Box
                    bgcolor="background.default"
                    height="100vh"
                    overflow="auto"
                >
                    {/*Navbar*/}
                    <AppBar position="sticky">
                        <Container
                        >
                                <Grid
                                container
                                display="flex"
                                justifyContent="space-between"
                                minHeight="64px"
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
                                            <MenuItem
                                            onClick={() => {
                                                setOpenMyAccount(true);
                                                setAnchorEl(null);
                                                }}>
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
                                            I didn't use it here, because it would make the Switch Tag's alignment
                                            weird.
                                            */}
                                                <Typography ml={1.4}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                        </Container>
                    </AppBar>

                    {/*Content*/}
                    <Container>
                        <Box
                        textAlign="center"
                        mt={7}
                        display={noContentDisplay}
                        >
                            <Typography variant="h4" color="text.primary">
                                Seems there is nothing to be shown for you, yet...
                            </Typography>
                            <Typography color="text.primary">
                                Click at the bottom "+" button to add your first serie!
                            </Typography>
                        </Box>

                        <Box
                        textAlign="center"
                        mt={7}
                        display={seriesDisplay}
                        >
                            <Stack justifyContent="center" alignItems="center" spacing={2}>
                                <Serie/>
                                <Serie/>
                                <Serie/>
                                <Serie/>
                                <Serie/>
                                <Serie/>
                                <Serie/>
                                <Serie/>
                            </Stack>
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
                                flexDirection="column"
                                minHeight={280}
                                justifyContent="space-around"
                                alignItems="center"
                                >
                                    <Typography variant="h5">Add a serie:</Typography>
                                    <TextField
                                    width="40px"
                                    variant="outlined"
                                    label="Name"
                                    />
                                    <TextField
                                    width="40px"
                                    variant="outlined"
                                    label="Amount of seasons" type="number"
                                    />
                                    <TextField
                                    width="40px"
                                    variant="outlined"
                                    label="Amount of episodes/season" type="number"
                                    />
                                </Box>
                                <Box textAlign="center" mt={4}>
                                    <Button variant="contained">Done</Button>
                                </Box>
                            </Paper>
                        </StyledModal>

                        {/*My account modal*/}
                        <StyledModal
                            open={openMyAccount}
                            onClose={() => setOpenMyAccount(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Paper
                                sx={{
                                    height: 500,
                                    width: {
                                        xs:"60%",
                                        md:"40%",
                                        lg:"30%",
                                        xl: "20%"
                                    },
                                    padding: "20px"
                                }}
                            >
                                <Box
                                display="flex"
                                flexDirection="column"
                                minHeight={280}
                                textAlign="flex-start"
                                >
                                    <Typography variant="h5" textAlign="center">
                                        My account
                                    </Typography>
                                    <Typography mt={2} mb={1}>Your email:</Typography>
                                    <TextField mb={2} disabled/>

                                    <Typography mt={2} mb={1}>Change password:</Typography>
                                    <TextField
                                    sx={{ marginBottom:"20px" }}
                                    label="your current password"
                                    type="password"
                                    />
                                    <TextField
                                    sx={{ marginBottom:"20px" }}
                                    label="your new password"
                                    type="password"
                                    />
                                    <TextField
                                    sx={{ marginBottom:"30px" }}
                                    label="confirm your new password"
                                    type="password"
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Button variant="contained">Save</Button>
                                </Box>
                            </Paper>
                        </StyledModal>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    );
}