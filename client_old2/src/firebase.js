// client/src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';

// ✅ Your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCmTFHM2PYDHhuoVl0IzKbDmuEqdIzGsWY",
  authDomain: "mytime-fe4ac.firebaseapp.com",
  projectId: "mytime-fe4ac",
  storageBucket: "mytime-fe4ac.firebasestorage.app", // 🔥 Updated bucket name
  messagingSenderId: "766248939233",
  appId: "1:766248939233:web:845b8b4f1ed29711b751a0",
  measurementId: "G-C9TX2DXYQT",
};

const app = initializeApp(firebaseConfig);

// 🚀 Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// ✅ Explicitly point to the correct bucket for uploads
export const storage = getStorage(app, 'mytime-fe4ac.firebasestorage.app');

// 🖼️ Helper to upload base64 image strings
export const uploadImageToStorage = async (imageFile, path) => {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadString(storageRef, imageFile, 'data_url');
  return getDownloadURL(uploadTask.ref);
};
