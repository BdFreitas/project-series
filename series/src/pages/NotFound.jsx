import React from "react";
import { Box } from "@mui/system";

export default function NotFound()
{
    return(
        <>
        <Box sx={{ maxWidth: "400px", margin: "0 auto", textAlign: "center"}}>
            <h1>
                Error 404, <br />
                page not found.
            </h1>
        </Box>
        </>
    )
}