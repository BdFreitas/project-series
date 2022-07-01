import React from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MovieIcon from '@mui/icons-material/Movie';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Tooltip } from "@mui/material";
import Season from "./Season";

export default function Serie(props)
{
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

                        <ListItemText primary={props.name} />

                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title ="Expand">
                            <IconButton onClick={handleClick}>
                                {
                                open ?
                                <ExpandLess/> :
                                <ExpandMore/>
                                }
                            </IconButton>
                        </Tooltip>
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Season />
                        </List>
                    </Collapse>
                </List>
            </Paper>
        </>
    );
}