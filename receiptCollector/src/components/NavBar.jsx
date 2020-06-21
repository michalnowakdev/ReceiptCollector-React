import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    makeStyles,
} from '@material-ui/core'
import getLang from '../lang/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: '10',
        position: 'absolute',
        top: '0'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        justifyContent: 'end',
        textTransform: 'capitalize',
        fontSize: 'large',
        color: "white",
        textDecoration: "none"
    },
}));

const NavBar = ({ auth }) => {
    const { login, logout } = auth;
    const isAuthenticated = auth.isAuthenticated();
    const classes = useStyles();
    const lang = getLang().navBar;

    return (
        <div>
            <AppBar position="sticky" className={classes.root} >
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        ReceiptCollector
                    </Typography>

                    {!isAuthenticated &&
                        <Button
                            color="inherit"
                            onClick={login}>
                            {lang.login}
                        </Button>
                    }
                    {isAuthenticated &&
                        <Button
                            color="inherit"
                            onClick={logout}>
                            {lang.logout}
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;