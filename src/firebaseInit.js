import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAArVN4FLpcBw7h-FgTW-eZYF15QRLf4rU",
    authDomain: "cloud-health-solution.firebaseapp.com",
    databaseURL: "https://cloud-health-solution-default-rtdb.firebaseio.com",
    projectId: "cloud-health-solution",
    storageBucket: "cloud-health-solution.appspot.com",
    messagingSenderId: "602146989734",
    appId: "1:602146989734:web:a063955698bf79a8b4f667",
    measurementId: "G-1CEYTHCHJC"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
