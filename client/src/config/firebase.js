// Firebase Core
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

// ✅ Updated Firebase Config (loop-app-b9fd8)
const firebaseConfig = {
  apiKey: "AIzaSyCIFuwvPOfti0E1lb2rb57-zQS42wq1rlI",
  authDomain: "loop-app-b9fd8.firebaseapp.com",
  projectId: "loop-app-b9fd8",
  storageBucket: "loop-app-b9fd8.appspot.com",
  messagingSenderId: "607084574080",
  appId: "1:607084574080:web:edffafe9b84cc3b2eb3d65",
  measurementId: "G-RLVWMTYS7F"
};

// Initialize App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ updated bucket URL not needed

// 🔐 AUTH HELPERS
const googleProvider = new GoogleAuthProvider();

const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
const logout = () => signOut(auth);

const checkAuthState = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      user ? resolve(user) : reject("No user logged in");
    });
  });

const getCurrentUserId = () => getAuth().currentUser?.uid || null;

// 🔥 FIRESTORE HELPERS
const getUserData = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

const saveUserData = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, userData, { merge: true });
};

const updateUserData = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, userData);
};

// ☁️ STORAGE HELPERS
const uploadFile = async (file, filePath) => {
  const ref = storageRef(storage, filePath);
  const uploadTask = uploadBytesResumable(ref, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress.toFixed(2)}% done`);
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// 🌐 EXPORTS
export {
  auth,
  db,
  storage,
  checkAuthState,
  getUserData,
  saveUserData,
  updateUserData,
  uploadFile,
  loginWithGoogle,
  registerWithEmail,
  loginWithEmail,
  logout,
  getCurrentUserId
};
