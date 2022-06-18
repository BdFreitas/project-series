import { AppBar, createTheme, Grid, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { pink } from "@mui/material/colors";
import { AccountCircle } from "@material-ui/icons";

export default function Series()
{
    const StyledToolbar = styled(Toolbar)({
        backgroundColor: "primary",
        display: "flex"
    })

    useEffect(() => {
        sessionStorage.setItem("mode", false);
    }, [])

    const [mode, setMode] = useState(false);

    const darkTheme = createTheme({
        palette: {
            mode: mode ? "dark" : "light",
            primary: {
                main: pink['A700']
            }
        }
    })

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        // setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky">
                        <StyledToolbar>
                            <Grid container display="flex" justifyContent="space-between">
                                <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
                                    <Typography variant="h5">Series Management</Typography>
                                </Grid>
                                <Grid item sx={{ display: { xs: "block", sm: "none" }, marginTop: "5px" }}>
                                    <LiveTvIcon />
                                </Grid>
                                <Grid item display="flex" alignItems="center">
                                    
                                </Grid>
                            </Grid>
                        </StyledToolbar>
                </AppBar>
            </ThemeProvider>
        </>
    );
}