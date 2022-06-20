import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { AppBar, Avatar, Button, Container, createTheme, Divider, Grid, IconButton, Menu, MenuItem, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { pink } from "@mui/material/colors";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import MoonIcon from '@mui/icons-material/Brightness3';
import Logout from '@mui/icons-material/Logout';

export default function Series()
{
    const navigator = useNavigate();

    const StyledToolbar = styled(Toolbar)({
        backgroundColor: "primary",
        display: "flex"
    })

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

    return(
        <>
            <ThemeProvider theme={darkTheme}>
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
                                            <Avatar sx={{ heigth: "4px" }}/>
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
                                        right: 14,
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
                                            <MoonIcon color="action"/>
                                            <Switch
                                            onChange={ () => {
                                                sessionStorage.setItem("mode", !mode);
                                                setMode(!mode);
                                            } }
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <Logout color="action"/>
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

                <Container>
                </Container>
            </ThemeProvider>
        </>
    );
}