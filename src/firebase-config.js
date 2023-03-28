import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
