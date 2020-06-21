import React, { useState } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import getLang from '../lang/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'aliceblue'
    }
}));

export default function Landing({ login }) {
    const classes = useStyles();
    const [lang] = useState(getLang().landingPage);
    return (
        <Grid container direction="column" className={classes.root} >
            <Grid item container>
                <Grid item xs={12}>
                    <Grid>
                        <h3>{lang.title}</h3>
                        <p>{lang.description}</p>

                        <Button variant="contained" color="primary" onClick={login}>
                            {lang.buttonTitle}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
