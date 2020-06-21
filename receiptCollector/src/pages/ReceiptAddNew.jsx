import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import { storage } from '../database/storage';

import Alert from '../domain/Alert';
import { ALERT_TYPES, ALERT_MESSAGESS } from '../components/Alert';

import {
    onSaveReceipt,
    onCompressImage
} from '../utils';
import getLang from '../lang/utils';

import '../assests/styles/styles.scss';

import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center"
    },
    form: {
        margin: theme.spacing(2),
        width: '-webkit-fill-available',
        fontSize: '2rem',
        minWidth: '350px',
        maxWidth: '50vw',
    },
    inputs: {
        width: 'inherit',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    icon: {
        marginLeft: theme.spacing(1)
    }
}));

const lang = getLang().receiptAdd;

const initialInputs = {
    title: {
        value: "",
        label: lang.title,
        isValid: false,
        name: "title"
    },
    imageFile: {
        value: "",
        label: lang.image,
        isValid: false,
        name: "imageFile"
    },
    cost: {
        value: "",
        label: lang.cost,
        isValid: false,
        name: "cost"
    }
};

export default function ReceiptAddNew({
    userEmail,
    setLoading,
    setalert,
    onRefetchReceipts
}) {
    const classes = useStyles();
    const [inputs, setInputValue] = useState(initialInputs);
    const [isFormValid, setValidationResult] = useState(false);

    const onChangeFunc = (name, value) => {
        let newInputs = { ...inputs };
        if (newInputs[name].value !== value) {
            newInputs[name].value = value;
            if (value.length) {
                newInputs[name].isValid = true;
            } else {
                newInputs[name].isValid = false;
            }
            if (name === 'imageFile' && newInputs[name].value && newInputs[name].value.name.length) {
                newInputs[name].isValid = true;
            }
            if (name === 'cost') {
                if (newInputs[name].value <= 0) {
                    newInputs[name].isValid = false;
                }
            }
            setInputValue(newInputs);
            onCheckValidation();
        }
    }

    const onCheckValidation = () => {
        const newInputs = { ...inputs };
        let isValid = true;
        Object.keys(newInputs).forEach(key => {
            if (!newInputs[key].isValid) {
                isValid = false;
            }
        })
        if (isFormValid !== isValid) {
            setValidationResult(isValid);
        }
    }

    const onSave = async () => {
        setLoading(true);
        const uuid = Date.now().toString();
        const imageName = `${userEmail}-${uuid}`;
        await onSaveImage(inputs.imageFile.value, imageName);
        const url = await onGetImageUrl(imageName);
        await onSaveReceipt({
            userEmail,
            imgUrl: url,
            title: inputs.title.value,
            cost: inputs.cost.value,
            imageName
        })
        setInputValue(initialInputs);
        setLoading(false);
        await onRefetchReceipts();
        setalert(new Alert(true, ALERT_TYPES.SUCCESS, ALERT_MESSAGESS.addedSuccessfully));
    }

    const onSaveImage = async (image, imageName) => {
        const resp = await storage.ref(`images/${imageName}`).put(image);
        return resp;
    }

    const onGetImageUrl = async (imageName) => {
        const url = await storage.ref('images').child(`${imageName}`).getDownloadURL();
        return url;
    }

    const onAddImage = async (event) => {
        const imageFile = await onCompressImage(event);
        onChangeFunc("imageFile", imageFile);
    }

    return (
        <Grid container className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    required
                    label={inputs.title.label}
                    className={classes.inputs}
                    onChange={e => onChangeFunc(inputs.title.name, e.target.value)}
                    error={!inputs.title.isValid}
                />
                <TextField
                    id="filled-number"
                    label={inputs.cost.label}
                    type="number"
                    className={classes.inputs}
                    onChange={e => onChangeFunc(inputs.cost.name, e.target.value)}
                    error={!inputs.cost.isValid}
                />

                <input type="file" name="file" accept="image/*" id="file" class="inputfile" onChange={onAddImage} />
                <label htmlFor="file"
                >

                    {inputs.imageFile.value && inputs.imageFile.value.name ? lang.addFileButton.fileChosen : lang.addFileButton.fileNotChosen}
                    <CloudUploadOutlinedIcon className={classes.icon} />

                </label>

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.inputs}
                    onClick={onSave}
                    disabled={!isFormValid}
                >
                    {lang.saveButtonTitle}
                </Button>
            </form>
        </Grid>
    );
}
