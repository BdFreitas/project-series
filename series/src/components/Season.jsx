import StarBorder from "@mui/icons-material/StarBorder";
import { Button, Checkbox, FormControlLabel, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import api from "../api";

export default function Season(props) {
    //Episode's modal
    const [openEpisodes, setOpenEpisodes] = useState(false);

    const handleClick = () => {
        setOpenEpisodes(true);
        getEpisodes();
        showEpisodes();
    }

    //Episodes
    const [episodes, setEpisodes] = useState([]);

    function getEpisodes()
    {
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

    function showEpisodes()
    {
        return(
            episodes.map((episode, index) => {
                return(
                    <FormControlLabel
                    control={
                        <Checkbox
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label={(index + 1) < 10 ? `EP0${index + 1}` : `EP${index + 1}`}
                    />
                )
            })
        )
    }

    return (
        <>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>

                <ListItemText
                    primary={`Season ${props.index}`}
                    secondary="10/20 watched episodes."
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
                        height: "380px",
                        width: "30%",
                        padding: "20px"
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
                        flexWrap="wrap"s
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
                            <Button variant="contained">Save</Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
}