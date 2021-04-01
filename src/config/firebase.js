import firebase from "firebase"
import "firebase/auth"
import "firebase/storage"

//insert config from firebase
const firebaseConfig  = {
    apiKey: "AIzaSyCqaWGswgDkFdtDYhUYnL7HAbaZIZpkwQM",
    authDomain: "ood-proj.firebaseapp.com",
    databaseURL: "https://ood-proj-default-rtdb.firebaseio.com",
    projectId: "ood-proj",
    storageBucket: "ood-proj.appspot.com",
    messagingSenderId: "548324614561",
    appId: "1:548324614561:web:a65a057614c844532b6be0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth()
export const storage = firebase.storage();
