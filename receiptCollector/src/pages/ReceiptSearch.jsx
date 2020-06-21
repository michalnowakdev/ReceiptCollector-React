import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Grid, TextField } from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

import DefultContent from '../components/NoParagonDefault';
import getLang from '../lang/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center"
    },
    search: {
        margin: theme.spacing(2),
        width: '-webkit-fill-available',
        fontSize: '2rem',
        minWidth: '350px',
        maxWidth: '50vw',
    },
    inputs: {
        width: 'inherit'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    }
}));

export default function ReceiptSearch({
    receipts,
    onDelete,
    setEditedReceipt,
    onAddNewReceipt
}) {
    const classes = useStyles();
    const [lang] = useState(getLang().reciptSearch);
    const [filterText, setfilterText] = useState("");
    const [filteredItems, setfilteredItems] = useState([]);

    useEffect(() => {
        if (!receipts.length) {
            setfilteredItems(receipts);
        }
    }, [receipts, filteredItems])

    useEffect(() => {
        const filteredReceipts = receipts.filter(r => r.title.toLowerCase().includes(filterText.toLowerCase()));
        setfilteredItems(filteredReceipts);
    }, [filterText, receipts])

    if (receipts && receipts.length) {
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} md={12} className={classes.search}>
                    <TextField
                        id="standard-helperText"
                        label={lang.search.label}
                        defaultValue=""
                        helperText={lang.search.helpertext}
                        className={classes.inputs}
                        onChange={e => setfilterText(e.target.value)}
                    />
                </Grid>

                {(filteredItems && filteredItems.length) ?
                    <Grid item xs={12} md={12} className={classes.search}>
                        <div className={classes.demo}>
                            <List dense={true}>
                                {filteredItems.map(receipt =>
                                    <ListItem key={receipt.title} >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={receipt.title}
                                            secondary={`${receipt.cost} - ${receipt.date}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="add to favorites" onClick={() => setEditedReceipt(receipt)}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(receipt)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="download">
                                                <a href={receipt.imgUrl} download id="download">
                                                    <GetAppOutlinedIcon />
                                                </a>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </List>
                        </div>
                    </Grid>
                    : null}
            </Grid>
        )
    }

    return <DefultContent onClick={onAddNewReceipt} />
}
