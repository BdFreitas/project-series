import React, { useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MovieIcon from '@mui/icons-material/Movie';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, IconButton, Modal, Paper, Snackbar, Tooltip, Typography } from "@mui/material";
import Season from "./Season";
import { Box } from "@mui/system";
import api from "../api";

export default function Serie(props) {
    //props
    const idSerie = props.idSerie;

    const updateSeriesAndShowAlert = props.update;

    //List expandMore
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        showSeasons();
        setOpen(!open);
    };

    //Seasons
    const seasons = props.seasons;

    function showSeasons() {
        return (
            seasons.map((season, index) => {
                return (
                    <Season
                        idSeason={season.idSeason}
                        index={index + 1}
                    />
                )
            })
        )
    }

    //Delete modal
    const [openDelete, setOpenDelete] = useState(false);

    function deleteSerie() {
        let severity;
        let message;

        api
            .delete(`/series/${idSerie}`)
            .then((response) => {
                if(response.status === 200) {
                    updateSeriesAndShowAlert();
                }
            })
            .catch((error) => {
                severity = "error";
                message = "CRITICAL: Unknown error!"

                showAlert(
                    severity,
                    message
                );
            });
        
        setOpenDelete(false);
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

    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <List component="nav">
                    <ListItemButton>
                        <ListItemIcon>
                            <MovieIcon />
                        </ListItemIcon>

                        <ListItemText primary={props.name} />

                        <Tooltip
                            title="Delete"
                            onClick={() => setOpenDelete(true)}
                        >
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Expand">
                            <IconButton onClick={handleClick}>
                                {
                                    open ?
                                        <ExpandLess /> :
                                        <ExpandMore />
                                }
                            </IconButton>
                        </Tooltip>
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                showSeasons()
                            }
                        </List>
                    </Collapse>
                </List>
            </Paper>

            {/*Deleting serie's Modal*/}
            <Modal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
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
                        minHeight: 100,
                        minWidth: "10%",
                        padding: "20px"
                    }}
                >
                    <Typography textAlign="center" variant="h6">
                        Delete?
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={7}
                    >
                        <Button onClick={() => setOpenDelete(false)}>No</Button>
                        <Button onClick={() => deleteSerie()}>Yes</Button>
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