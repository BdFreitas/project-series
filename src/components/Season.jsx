import StarBorder from "@mui/icons-material/StarBorder";
import { Alert, Button, Checkbox, FormControlLabel, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import api from "../api";
import Episode from "./Episode";

export default function Season(props) {
    //Episode's modal
    const [openEpisodes, setOpenEpisodes] = useState(false);

    const handleClick = () => {
        setOpenEpisodes(true);
        setEpisodes([]);
        getEpisodes();
        showEpisodes();
        setChangedEps([]);
    }

    //Snackbar Alerts
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

    //Episodes
    const [episodes, setEpisodes] = useState([]);

    function getEpisodes() {
        api
            .get(`/episodes/${props.idSeason}`)
            .then((response) => {
                if (response.status === 200) {
                    setEpisodes(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [changedEps, setChangedEps] = useState([]);

    const saveEpChanges = (episode) => {
        let array = changedEps;

        for (let index = 0; index < array.length; index++) {
            if (array[index].idEpisode === episode.idEpisode) {
                array[index] = episode;
                setChangedEps(array);
                console.log(changedEps);
                return;
            }
        }

        array.push(episode);
        setChangedEps(array);
    }

    function showEpisodes() {
        return (
            episodes.map((episode, index) => {
                return (
                    <Episode
                        idEpisode={episode.idEpisode}
                        index={index}
                        watched={episode.watched}
                        method={saveEpChanges}
                    />
                )
            })
        )
    }

    function save() {
        let severity;
        let message;
        let bool = true;

        if (changedEps.length === 0) {
            severity = "warning";
            message = "You can't save without changes!"

            showAlert(
                severity,
                message
            );

            return;
        }

        api
        .put("/episodes", changedEps)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            bool = false;
        })

        if (bool) {
            severity = "success";
            message = "Saved!";
        } else {
            severity = "success";
            message = "CRITICAL: Unknown error!";
        }

        setOpenEpisodes(false);

        showAlert(
            severity,
            message
        );
    }

    return (
        <>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>

                <ListItemText
                    primary={`Season ${props.index}`}
                />
                <Button onClick={handleClick}>Show episodes</Button>
            </ListItemButton>

            <Modal
                open={openEpisodes}
                onClose={() => setOpenEpisodes(false)}
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
                        height: "450px",
                        width: {xs: "60%", lg: "30%"},
                        padding: "20px",
                        overflowY: "auto"
                    }}
                >
                    <Typography
                        textAlign="center"
                        variant="h5"
                    >
                        {`Season ${props.index}`}
                    </Typography>
                    <Box>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="space-evenly"
                            mt={1}
                        >
                            {
                                showEpisodes()
                            }
                        </Box>
                        <Box
                            textAlign="center"
                            mt={2}
                        >
                            <Button
                                variant="contained"
                                onClick={() => save()}
                            >Save</Button>
                        </Box>
                    </Box>
                </Paper>
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
        </>
    );
}