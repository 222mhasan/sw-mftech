// AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // 👈 Firestore imports

export const AuthContext = createContext();

const auth = getAuth(app);
const db = getFirestore(app); // 👈 Initialize Firestore

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPin, setUserPin] = useState("");

  // 🔹 Save PIN to Firestore
  const savePinToFirestore = async (uid, pin) => {
    try {
      await setDoc(doc(db, "users", uid), { pin });
    } catch (error) {
      console.error("Error saving PIN:", error);
    }
  };

  // 🔹 Fetch PIN from Firestore
  const fetchPinFromFirestore = async (uid) => {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserPin(data.pin || "");
      }
    } catch (error) {
      console.error("Error fetching PIN:", error);
    }
  };

  // 🔹 Create new user
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login user
  const userLogin = async (email, password) => {
    setLoading(true);
    await setPersistence(auth, browserSessionPersistence); // 🔐 Set session-only
    const res = await signInWithEmailAndPassword(auth, email, password);
    await fetchPinFromFirestore(res.user.uid);
    return res;
  };

  // 🔹 Update profile
  const updateUserProfile = (name) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
      }).then(() => {
        setUser({ ...auth.currentUser, displayName: name });
      });
    }
  };

  // 🔹 Save PIN after registration
  const registerUserWithPin = async (email, password, pin) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await savePinToFirestore(res.user.uid, pin); // 👈 Save PIN to Firestore
    setUserPin(pin);
    return res;
  };

  // 🔹 Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUserPin(""); // Clear PIN on logout
    });
  };

  // 🔹 Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchPinFromFirestore(currentUser.uid); // 👈 Fetch PIN on reload
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    user,
    setUser,
    createNewUser,
    registerUserWithPin, // 👈 Expose for use in Registration
    userLogin,
    updateUserProfile,
    userPin,
    setUserPin,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
