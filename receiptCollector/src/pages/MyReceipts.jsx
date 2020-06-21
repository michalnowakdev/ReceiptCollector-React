import React from 'react';
import Card from '../components/Card';
import { Grid, makeStyles } from '@material-ui/core';

import DefultContent from '../components/NoParagonDefault';

const useStyles = makeStyles(() => ({
    item: {
        padding: "20px 20px"
    }
}));

export default function MyReceipts({
    receipts,
    onDelete,
    setEditedReceipt,
    onAddNewReceipt
}) {
    const classes = useStyles();
    if (receipts && receipts.length) {
        return (
            <Grid container >
                {receipts.map(receipt =>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
                        <Card
                            key={receipt.key}
                            receipt={receipt}
                            onDelete={onDelete}
                            setEditedReceipt={setEditedReceipt}
                        />
                    </Grid>
                )
                }
            </Grid>
        )
    }
    return (
        <DefultContent onClick={onAddNewReceipt} />
    )
}
