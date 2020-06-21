import React, { useState } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import getLang from '../lang/utils';

const NoParagonDefault = ({ onClick }) => {
    const [lang] = useState(getLang().noParagonDefault);

    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'aliceblue'
        },
        item: {
            padding: "20px 20px"
        }
    }));
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.root} >
            <Grid item container>
                <Grid item xs={12}>
                    <Grid>
                        <h3>{lang.title}</h3>
                        <p>{lang.description}</p>
                        <Button variant="contained" color="secondary" onClick={onClick}>
                            {lang.buttonTitle}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default NoParagonDefault;