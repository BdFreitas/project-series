import { Button, Typography, Box, Paper, createTheme, TextField, ThemeProvider } from "@mui/material";
import React from "react";
import { pink } from "@mui/material/colors";
import SignUpIcon from "@mui/icons-material/AssignmentInd";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigator = useNavigate();

    const darkTheme = createTheme({
        palette: {
            mode: sessionStorage.getItem("mode") === "true" ? "dark" : "light",
            primary: {
                main: pink['A700']
            }
        }
    })

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                    <Box alignItems={"center"} display={"flex"} bgcolor="background.default" justifyContent="center" height={"100vh"}>
                        <Paper elevation={7} sx={{ width: 380, height: 430, borderRadius: 5, padding: 7 }}>
                            <Typography variant="h4" textAlign="center">Sign Up <SignUpIcon /></Typography>
                            
                            <TextField label="Email" color="primary" variant="filled" sx={{ width:"100%", margin: "20px 0" }}/>
                            <TextField label="Password" color="primary" variant="filled" sx={{ width:"100%", margin: "20px 0" }}/>
                            <TextField label="Confirm password" color="primary" variant="filled" sx={{ width:"100%", margin: "20px 0" }}/>

                            <Box marginTop="20px">
                                <Button variant="contained" color="secondary" sx={{ width: "100%" }}>Create account</Button>
                                <Typography fontSize="small" textAlign="center" mt={2} sx={{ cursor: "pointer" }}>
                                    <u onClick={() => navigator("/login")}>Already have and account? Click here!</u>
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
            </ThemeProvider>
        </>
    )
}