import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgg1VqlyIip9T5B49fdlzP6PKIbAhJf3E",
  authDomain: "pick-and-stitches-d16b6.firebaseapp.com",
  projectId: "pick-and-stitches-d16b6",
  storageBucket: "pick-and-stitches-d16b6.appspot.com",
  messagingSenderId: "171649481852",
  appId: "1:171649481852:web:1f3b34cbc212a5f4879df9",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firestore, storage, auth };
