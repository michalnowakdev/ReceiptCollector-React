import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '../domain/Alert';
import { isEqual } from 'lodash';
import getLang from '../lang/utils';


function AlertToast(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars({
    alert,
    setAlert
}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [prevAlert, setPrevAlert] = useState(null);

    useEffect(() => {
        if (!isEqual(prevAlert, alert)) {
            setPrevAlert(alert);
            alert.isOpen && !open && setOpen(true);
        }
    }, [alert, open, prevAlert]);

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setAlert(new Alert(false, alert.type, alert.message))
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <AlertToast onClose={handleClose} severity={alert.type}>
                    {alert.message}
                </AlertToast>
            </Snackbar>
        </div>
    );
}

export const ALERT_TYPES = {
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
    SUCCESS: "success"
}

export const ALERT_MESSAGESS = {
    accountCreatedSuccessfully: getLang().alertMessages.accountCreatedSuccessfully,
    receiptDeletedSuccessfully: getLang().alertMessages.receiptDeletedSuccessfully,
    updatedSuccessfully: getLang().alertMessages.updatedSuccessfully,
    addedSuccessfully: getLang().alertMessages.addedSuccessfully
}