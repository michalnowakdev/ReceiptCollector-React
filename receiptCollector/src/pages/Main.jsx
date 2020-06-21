import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { Grid } from '@material-ui/core';

import MyReceipts from './MyReceipts';
import ReceiptAddNew from './ReceiptAddNew';
import ReceiptSearch from './ReceiptSearch';
import UserProfile from './UserProfile';
import Loader from '../components/Loader';
import AlertToast, { ALERT_TYPES, ALERT_MESSAGESS } from '../components/Alert';

import Alert from '../domain/Alert';
import EditModal from '../components/EditModal';
import getLang from '../lang/utils';

import {
    onCheckIfUserExists,
    onAddNewUser,
    onFetchAllReceipts,
    onDeleteReceipt
} from '../utils';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        height: 'calc(100vh - 120px)',
        backgroundColor: 'aliceblue',
        overflowX: 'auto'

    },
    navigationRoot: {
        width: '100vw',
        maxWidth: '100vw',
    },
    navigationItem: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '13px',
    }
})
)

const navBarValues = {
    recepits: 'recepits',
    addNew: 'addNew',
    search: 'Search',
    profile: 'profile'
}

export default function Main({ userEmail, userName }) {
    const [lang] = useState(getLang().main);
    const classes = useStyles();
    const [navBarValue, setNavBarValue] = useState(navBarValues.recepits);
    const [myReceipts, setMyReceipts] = useState([]);
    const [editedReceipt, setEditedReceipt] = useState(null);
    const [editedModalOpen, seteditedModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstFetch, setfirstFetch] = useState(false);
    const [alert, setalert] = useState(
        new Alert(false, ALERT_TYPES.SUCCESS, "works"));

    const { navigation } = lang;

    const onFetchReceipts = useCallback(
        async () => {
            let userAlert = null;
            setLoading(true);
            const doesUserExist = await onCheckIfUserExists({ userEmail });
            if (doesUserExist) {
                const fetchedReceipts = await onFetchAllReceipts({ userEmail });
                setMyReceipts(fetchedReceipts);
            } else {
                const isUserAddedSuccessfully = await onAddNewUser({ userEmail, userName })
                if (isUserAddedSuccessfully) {
                    userAlert = new Alert(true, ALERT_TYPES.SUCCESS, ALERT_MESSAGESS.accountCreatedSuccessfully);
                    userAlert && setalert(userAlert);
                }
            }
            setLoading(false);
        },
        [userEmail, userName],
    )


    const onRefetchReceipts = useCallback(
        async () => {
            setLoading(true);
            const fetchedReceipts = await onFetchAllReceipts({ userEmail });
            setMyReceipts(fetchedReceipts);
            setLoading(false);
        },
        [userEmail],
    )

    const onDelete = async (receiptToDelete) => {
        await onDeleteReceipt({
            id: receiptToDelete.id,
            userEmail,
            imageName: receiptToDelete.imageName
        });
        await onRefetchReceipts();
        setalert(new Alert(true, ALERT_TYPES.SUCCESS, ALERT_MESSAGESS.receiptDeletedSuccessfully));
    }

    useEffect(() => {
        if (!firstFetch) {
            setfirstFetch(true);
            onFetchReceipts();
        }
    }, [myReceipts, onFetchReceipts, firstFetch]);

    const setEdited = (receipt) => {
        setEditedReceipt(receipt);
        seteditedModalOpen(true);
    }

    const getCurrentPage = () => {
        switch (navBarValue) {
            case navBarValues.recepits:
                return loading ?
                    <Loader /> :
                    <MyReceipts
                        receipts={myReceipts}
                        onDelete={onDelete}
                        setEditedReceipt={setEdited}
                        onAddNewReceipt={() => setNavBarValue(navBarValues.addNew)}
                    />
            case navBarValues.addNew:
                return loading ?
                    <Loader /> :
                    <ReceiptAddNew
                        setLoading={setLoading}
                        setalert={setalert}
                        userEmail={userEmail}
                        onRefetchReceipts={onRefetchReceipts}
                    />
            case navBarValues.search:
                return loading ?
                    <Loader /> :
                    <ReceiptSearch
                        receipts={myReceipts}
                        onDelete={onDelete}
                        setEditedReceipt={setEdited}
                        onAddNewReceipt={() => setNavBarValue(navBarValues.addNew)}
                    />
            case navBarValues.profile:
                return (
                    <UserProfile
                        userName={userName}
                    />
                )
            default:
                break;
        }
    }


    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '64px'
        }}>

            <BottomNavigation value={navBarValue} onChange={(_event, value) => setNavBarValue(value)} className={classes.navigationRoot}>
                <BottomNavigationAction
                    label={navigation.myReceipts}
                    value={navBarValues.recepits}
                    icon={<ReceiptOutlinedIcon />}
                    className={classes.navigationItem}
                    disabled={loading}
                />
                <BottomNavigationAction
                    label={navigation.addNew}
                    value={navBarValues.addNew}
                    icon={<AddOutlinedIcon />}
                    className={classes.navigationItem}
                    disabled={loading}
                />
                <BottomNavigationAction
                    label={navigation.search}
                    value={navBarValues.search}
                    icon={<SearchOutlinedIcon />}
                    className={classes.navigationItem}
                    disabled={loading}
                />
                <BottomNavigationAction
                    label={navigation.profile}
                    value={navBarValues.profile}
                    icon={<AccountCircleOutlinedIcon />}
                    className={classes.navigationItem}
                    disabled={loading}
                />
            </BottomNavigation>

            <Grid color="primary" container direction="column" className={classes.gridRoot} >
                {getCurrentPage()}
            </Grid>
            <AlertToast alert={alert} setAlert={setalert} />
            <EditModal
                onClose={() => {
                    seteditedModalOpen(false);
                    setEditedReceipt(null)
                }}
                isOpen={editedModalOpen}
                receipt={editedReceipt}
                setAlert={setalert}
                userEmail={userEmail}
                onRefetchReceipts={onRefetchReceipts}
            />
        </div>
    );
}
