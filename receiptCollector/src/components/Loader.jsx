import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '40vh',
    },
    loader: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
)

export default function Loader() {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.root} >
            <CircularProgress
                color="secondary"
                className={classes.loader}
            />
        </Grid>

    )
}
