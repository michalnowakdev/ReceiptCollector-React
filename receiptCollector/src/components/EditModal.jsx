import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { onUpdateReceipt } from '../utils';

import Alert from '../domain/Alert';
import { ALERT_TYPES, ALERT_MESSAGESS } from './Alert';

import Modal from '@material-ui/core/Modal';
import getLang from '../lang/utils';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '80vw',
        minHeight: '200px',
        height: '50vh',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    rootGrid: {
        margin: theme.spacing(2),
        width: '-webkit-fill-available',
        fontSize: '2rem'

    },
    inputs: {
        margin: theme.spacing(2),
        width: 'inherit'
    },
    fileButton: {
        margin: theme.spacing(2),
        width: 'inherit'
    }
}));

export default function SimpleModal({
    isOpen,
    receipt,
    onClose,
    setAlert,
    userEmail,
    onRefetchReceipts
}) {
    const classes = useStyles();
    const [lang] = useState(getLang().receiptEdit);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [inputs, setInputValue] = useState(null);
    const [isFormValid, setValidationResult] = useState(true);
    const [prevOpen, setPrevOpen] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    useEffect(() => {
        if (prevOpen !== isOpen) {
            setPrevOpen(isOpen);
            isOpen && !open && handleOpen();
        }
    }, [isOpen, open, prevOpen]);

    useEffect(() => {
        if (inputs === null && receipt) {
            const { title, cost, imgUrl } = receipt;
            setInputValue({
                title: {
                    value: title,
                    label: lang.description,
                    isValid: true,
                    name: "title"
                },
                imageFile: {
                    value: imgUrl,
                    label: lang.image,
                    isValid: true,
                    name: "imageFile"
                },
                cost: {
                    value: cost,
                    label: lang.cost,
                    isValid: true,
                    name: "cost"
                }
            })
        }
    }, [inputs, receipt, lang]);

    const onChangeFunc = (name, value) => {
        let newInputs = { ...inputs };
        if (newInputs[name].value !== value) {
            newInputs[name].value = value;
            if (value.length) {
                newInputs[name].isValid = true;
            } else {
                newInputs[name].isValid = false;
            }
            if (name === 'imageFile' && newInputs[name].value) {
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

    const onUpdate = async () => {
        await onUpdateReceipt({
            cost: inputs.cost.value,
            title: inputs.title.value,
            userEmail,
            id: receipt.id
        });
        handleClose();
        setAlert(new Alert(true, ALERT_TYPES.SUCCESS, ALERT_MESSAGESS.updatedSuccessfully))
        onRefetchReceipts();
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {inputs ? <form className={classes.rootGrid} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    required
                    label={inputs.title.label}
                    className={classes.inputs}
                    onChange={e => onChangeFunc(inputs.title.name, e.target.value)}
                    error={!inputs.title.isValid}
                    defaultValue={inputs.title.value}
                />
                <TextField
                    id="filled-number"
                    label={inputs.cost.label}
                    type="number"
                    className={classes.inputs}
                    onChange={e => onChangeFunc(inputs.cost.name, e.target.value)}
                    error={!inputs.cost.isValid}
                    defaultValue={inputs.cost.value}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.inputs}
                    onClick={onUpdate}
                    disabled={!isFormValid}
                >
                    {lang.buttonTitle}
                </Button>
            </form> : null}
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
