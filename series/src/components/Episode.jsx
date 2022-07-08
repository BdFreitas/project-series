import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Episode(props)
{
    const idEpisode = props.idEpisode;
    const index = props.index;
    const [watched, setWatched] = useState(props.watched);
    const saveEpChanges = props.method;

    const handleClick = (event) => {
        setWatched(event.target.checked);

        let episode = {
            "idEpisode": idEpisode,
            "watched": event.target.checked
        }

        saveEpChanges(episode);
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                checked={watched}
                onChange={handleClick}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            }
            label={(index + 1) < 10 ? `EP0${index + 1}` : `EP${index + 1}`}
        />
    );
}