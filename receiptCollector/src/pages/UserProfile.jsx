import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import userEmpty from '../assests/images/user.png';
import getLang from '../lang/utils';

const useStyles = makeStyles((_theme) => ({
    root: {
        textAlign: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'aliceblue'
    }
}));

export default function UserProfile({ userName }) {
    const classes = useStyles();
    const lang = getLang().userProfile;
    return (
        <Grid container direction="column" className={classes.root} >
            <Grid item container>
                <Grid item xs={12}>
                    <Grid>
                        <img src={userEmpty} alt="USer" width="50%" style={{ maxWidth: '80px' }} />
                        <h3>{userName}{lang.description}</h3>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
