import styled from "@emotion/styled";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SignUpIcon from '@mui/icons-material/AssignmentInd';

const StyledToolbar = styled(Toolbar)({
    backgroundColor: "#DA70D6",
    display: "flex"
})


export default function Login() {
    return (
        <>
            <AppBar position="sticky">
                <StyledToolbar>
                    <Grid container display="flex" justifyContent="space-between">
                        <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
                            <Typography variant="h5">Series Management</Typography>
                        </Grid>
                        <Grid item sx={{ display: { xs: "block", sm: "none" }, marginTop: "5px" }}>
                            <LiveTvIcon />
                        </Grid>
                        <Grid item>
                            <Button startIcon={<SignUpIcon />} color="secondary" variant="contained" sx={{ "marginLeft": "10px" }}>Sign up</Button>
                        </Grid>
                    </Grid>
                </StyledToolbar>
            </AppBar>
        </>
    )
}