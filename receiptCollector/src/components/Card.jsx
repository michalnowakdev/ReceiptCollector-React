import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import getLang from '../lang/utils';

import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100vh',
    },
    cardActions: {
        backgroundColor: grey[100],
        justifyContent: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        cursor: "pointer"
    },
    grid: {
        paddingTop: '5px',
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: '1.2em'
    }
}));

export default function RecipeReviewCard({
    receipt,
    onDelete,
    setEditedReceipt
}) {
    const classes = useStyles();
    const lang = getLang().components.card;
    const getCost = (cost) => {
        return `${lang.cost + cost} ${lang.currency}`;
    }

    return (
        <Card className={classes.root}>
            <a href={receipt.imgUrl} download id="download">
                <CardMedia
                    className={classes.media}
                    image={receipt.imgUrl}
                    title={lang.mediaTitle}
                />
            </a>
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p" className={classes.title}>
                    {receipt.title}
                </Typography>

                <Grid container className={classes.grid} >
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" >
                            {getCost(receipt.cost)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                            {lang.date} {receipt.date}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => setEditedReceipt(receipt)}>
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={() => onDelete(receipt)}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
