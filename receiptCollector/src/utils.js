import { storage, db } from './database/storage';
import imageCompression from 'browser-image-compression';
import moment from 'moment';

export const onCheckIfUserExists = async ({ userEmail }) => {
    const userRef = db.collection('users')
        .doc(userEmail);

    const user = await userRef.get();
    if (!user.exists) return false;
    return true;
};

export const onAddNewUser = async ({ userEmail, userName }) => {
    const newUserRef = db.collection('users').doc(userEmail);
    const result = await newUserRef.set({
        email: userEmail,
        name: userName
    });
    return result;
};

export const onSaveReceipt = async ({ cost, imgUrl, title, userEmail, imageName }) => {
    const receipt = {
        id: Date.now().toString(),
        date: moment(new Date()).format('DD/MM/YYYY'),
        cost,
        imgUrl,
        title,
        imageName
    };
    const resp = await db.collection('users')
        .doc(userEmail)
        .collection("receipts")
        .doc(receipt.id)
        .set(receipt);
    return resp;
}

export const onUpdateReceipt = async ({ cost, title, userEmail, id }) => {
    const resp = await db.collection('users')
        .doc(userEmail)
        .collection("receipts")
        .doc(id)
        .update({ cost, title });
    return resp;
}

export const onDeleteReceipt = async ({ userEmail, id, imageName }) => {
    await db.collection('users')
        .doc(userEmail)
        .collection("receipts")
        .doc(id).delete();
    await onDeleteImage(imageName);
}

const onDeleteImage = async (imageName) => {
    await storage.ref('images').child(`${imageName}`).delete();
}

export const onFetchAllReceipts = async ({ userEmail }) => {
    const receipts = [];

    const userRef = db.collection('users')
        .doc(userEmail).collection('receipts');

    const snapshot = await userRef.get();
    if (snapshot.empty) {
        console.log('no documents found');
    }
    else {
        snapshot.forEach(doc => {
            const receipt = {
                id: doc.id,
                ...doc.data()
            };
            console.log(receipt);
            receipts.push(receipt);
        })
    };
    return receipts;
}

export const onCompressImage = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile;
    } catch (error) {
        console.log(error);
    }
}

export const onSetBrowserLang = () => {
    const language = window.navigator.userLanguage || window.navigator.language;
    localStorage.setItem("lang", language);
}
