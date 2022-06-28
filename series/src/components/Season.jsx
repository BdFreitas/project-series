import StarBorder from "@mui/icons-material/StarBorder";
import { Button, Checkbox, FormControlLabel, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function Season(props) {
    //Episode's modal
    const [openEpisodes, setOpenEpisodes] = useState(false);

    const StyledModal = styled(Modal)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    })

    //Episodes
    const [episodes, setEpisodes] = useState([1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2]);

    return (
        <>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>

                <ListItemText
                    primary={`Season ${props.index}`}
                    secondary="10/20 episodes watched."
                />
                <Button onClick={() => setOpenEpisodes(true)}>Show episodes</Button>
            </ListItemButton>

            <StyledModal
                open={openEpisodes}
                onClose={() => setOpenEpisodes(false)}
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
            </StyledModal>
        </>
    );
}