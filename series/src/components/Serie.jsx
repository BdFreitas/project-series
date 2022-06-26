import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MovieIcon from '@mui/icons-material/Movie';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Paper, Tooltip } from "@mui/material";

export default function Serie(props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <List component="nav">
                    <ListItemButton>
                        <ListItemIcon>
                            <MovieIcon />
                        </ListItemIcon>

                        <ListItemText primary="Serie" />

                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title ="Expand">
                            <IconButton>
                                {
                                open ?
                                <ExpandLess onClick={handleClick}/> :
                                <ExpandMore onClick={handleClick}/>
                                }
                            </IconButton>
                        </Tooltip>
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>

                                <ListItemText
                                primary="Season 1"
                                secondary="10/20 episodes watched."
                                />
                                <Button>Show episodes</Button>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Paper>
        </>
    );
}