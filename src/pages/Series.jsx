import React, { useEffect, useState } from "react";
import { Alert, AppBar, Avatar, Box, Button, Container, createTheme, Divider, Fab, Grid, IconButton, Menu, MenuItem, Modal, Paper, Snackbar, Stack, Switch, TextField, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import MoonIcon from '@mui/icons-material/Brightness3';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Serie from "../components/Serie";
import api from "../api";

export default function Series() {
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

    // Add serie's modal
    const [openAddSerie, setOpenAddSerie] = useState(false);

    //Add serie's request
    const [name, setName] = useState("");
    const [amtSeasons, setAmtSeasons] = useState("");
    const [amtEpisodes, setAmtEpisodes] = useState("");

    function addSerie() {
        let severity;
        let message;

        if (name === "" || amtSeasons === "" || amtEpisodes === "") {
            severity = "warning";
            message = "All the fields must be completed!";

            showAlert(
                severity,
                message
            )

            return;
        }

        if (amtSeasons <= 0 || amtEpisodes <= 0) {
            severity = "error";
            message = "Invalid values!";

            showAlert(
                severity,
                message
            )

            return;

        }

        let newSerie = {
            "idUser": sessionStorage.getItem("idUser"),
            "name": name,
            "seasons": amtSeasons,
            "episodes": amtEpisodes
        }

        api
            .post("/series", newSerie)
            .then((response) => {
                if (response.status === 201) {
                    showAlert(
                        "success",
                        "Added successfully!"
                    );
                    setOpenAddSerie(false);
                    getSeries();
                    showSeries();
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    showAlert(
                        "error",
                        "Sorry, high amounts are not suported!"
                    )
                } else if (error.response.status === 500) {
                    showAlert(
                        "error",
                        "CRITICAL: Unkown error."
                    )
                }
            })
    }

    // My account modal
    const [openMyAccount, setOpenMyAccount] = useState(false);

    // Get series request
    const [series, setSeries] = useState([]);

    function getSeries() {
        let idUser = sessionStorage.getItem("idUser") ?
            sessionStorage.getItem("idUser") :
            null;

        api
            .get(`/series/${idUser}`)
            .then((response) => {
                if (response.status === 200) {
                    setSeries(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getSeries();
        showSeries();
    }, []);

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

    // Content - displays
    const [noContentDisplay, setNoContentDisplay] = useState("none");
    const [seriesDisplay, setSeriesDisplay] = useState("none");

    function showContent() {
        if (series.length === 0) {
            setNoContentDisplay("");
            setSeriesDisplay("none");

            return;
        }

        setNoContentDisplay("none");
        setSeriesDisplay("");
    }

    useEffect(() => {
        showContent();
    }, [series]);

    function showSeries() {
        return (
            series.map((serie, index) => {
                return (
                    <Serie
                        idSerie={serie.serie.idSerie}
                        name={serie.serie.name}
                        seasons={serie.seasons}
                        update={getAndshowSeriesAndAlert}
                    />
                )
            })
        )
    }

    //Verify authenticantion
    useEffect(() => {
        if (!sessionStorage.getItem("idUser")) {
            navigator("/login");
        }
    }, [])

    //Logout
    function logout() {
        sessionStorage.clear();
        navigator("/");
    }

    //Change password
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    function saveNewPassword() {
        let severity;
        let message;

        if (password === "" || newPassword === "" || confirmedPassword === "") {
            severity = "warning";
            message = "All the fields must be completed!"

            showAlert(
                severity,
                message
            )

            return;
        }

        if (newPassword !== confirmedPassword) {
            severity = "warning";
            message = "The passwords must be matching!"

            showAlert(
                severity,
                message
            )

            return;
        }

        if (newPassword === password) {
            severity = "warning";
            message = "Your new password and your current one can't be the same!"

            showAlert(
                severity,
                message
            )

            return;
        }

        let email = sessionStorage.getItem("email");

        let user = {
            "email": email,
            "password": password,
            "newPassword": newPassword
        }

        api
            .put("/users", user)
            .then((response) => {
                if (response.status === 200) {
                    severity = "success";
                    message = "Your password has been changed!";

                    setOpenMyAccount(false);

                    showAlert(
                        severity,
                        message
                    );
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    severity = "error";
                    message = "Your current password is wrong.";

                    showAlert(
                        severity,
                        message
                    );
                } else {
                    severity = "error";
                    message = "CRITICAL: Unknown error.";

                    showAlert(
                        severity,
                        message
                    );
                }
            })
    }

    //Clear consts
    function clearConsts() {
        //Adding serie's consts
        setName("");
        setAmtEpisodes("");
        setAmtSeasons("");

        //Changing password's consts
        setPassword("");
        setNewPassword("");
        setConfirmedPassword("");
    }

    //Delete serie
    const getAndshowSeriesAndAlert = () => {
        getSeries();
        showSeries();
        showAlert("success", "Deleted successfully");
    }

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
                                                clearConsts();
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
                                        <MenuItem onClick={() => logout()}>
                                            <Logout color="action" />
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
                                Seems that there is nothing to be shown for you, yet...
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
                                {showSeries()}
                            </Stack>
                        </Box>


                        {/*Adding series feature*/}
                        <Tooltip title="Add a serie">
                            <Fab
                                onClick={() => {
                                    setOpenAddSerie(true);
                                    clearConsts();
                                }}
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

                        <Modal
                            open={openAddSerie}
                            onClose={() => setOpenAddSerie(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Paper
                                sx={{
                                    height: "380px",
                                    width: {
                                        xs: "60%",
                                        sm: "50%",
                                        md: "40%",
                                        lg: "30%"
                                    },
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
                                        onInput={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        width="40px"
                                        variant="outlined"
                                        label="Amount of seasons" type="number"
                                        onInput={(e) => setAmtSeasons(e.target.value)}
                                    />
                                    <TextField
                                        width="40px"
                                        variant="outlined"
                                        label="Amount of episodes/season" type="number"
                                        onInput={(e) => setAmtEpisodes(e.target.value)}
                                    />
                                </Box>
                                <Box textAlign="center" mt={4}>
                                    <Button
                                        variant="contained"
                                        onClick={() => addSerie()}
                                    >
                                        Done
                                    </Button>
                                </Box>
                            </Paper>
                        </Modal>

                        {/*My account modal*/}
                        <Modal
                            open={openMyAccount}
                            onClose={() => setOpenMyAccount(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Paper
                                sx={{
                                    height: 500,
                                    width: {
                                        xs: "60%",
                                        md: "40%",
                                        lg: "30%",
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
                                    <TextField
                                        mb={2}
                                        disabled
                                        defaultValue={sessionStorage.getItem("email")}
                                    />

                                    <Typography mt={2} mb={1}>Change password:</Typography>
                                    <TextField
                                        sx={{ marginBottom: "20px" }}
                                        label="your current password"
                                        type="password"
                                        onInput={(e) => setPassword(e.target.value)}
                                    />
                                    <TextField
                                        sx={{ marginBottom: "20px" }}
                                        label="your new password"
                                        type="password"
                                        onInput={(e) => setNewPassword(e.target.value)}
                                    />
                                    <TextField
                                        sx={{ marginBottom: "30px" }}
                                        label="confirm your new password"
                                        type="password"
                                        onInput={(e) => setConfirmedPassword(e.target.value)}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Button onClick={() => saveNewPassword()} variant="contained">Save</Button>
                                </Box>
                            </Paper>
                        </Modal>
                    </Container>

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
    );
}