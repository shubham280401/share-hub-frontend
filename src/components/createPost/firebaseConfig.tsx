import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-eVQ78L2UqzcIdjkX1lm2U2OZ8okecps",
  authDomain: "share-hub-f1217.firebaseapp.com",
  projectId: "share-hub-f1217",
  storageBucket: "share-hub-f1217.appspot.com",
  messagingSenderId: "10710487265",
  appId: "1:10710487265:web:82a6f2656b608d232ae7a0",
  measurementId: "G-VJJV87GNX4",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
