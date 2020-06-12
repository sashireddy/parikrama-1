import firebase from 'firebase';
import token from "./token";

const firebaseConfig = {
    apiKey: token.apiKey,
    authDomain: token.authDomain,
    databaseURL: token.databaseURL,
    projectId: token.projectId,
    storageBucket: token.storageBucket,
    messagingSenderId: token.messagingSenderId,
    appId: token.appId
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;