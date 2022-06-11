import React from "react";
import Button, { useThemeProps } from "@mui/material";
import { ClassNames } from "@emotion/react";

export default StyledButton(props)
{
    const buttonStyle = {
        "outline-color": props.outlineColor ? props.outlineColor : "purple" 
    }

    return(
        <>
            <Button className={classes.buttonStyle}>

            </Button>
        </>
    )
}