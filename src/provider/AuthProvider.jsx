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
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

const auth = getAuth(app);
const db = getFirestore(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPin, setUserPin] = useState("");

  // Save PIN to Firestore
  const savePinToFirestore = async (uid, pin) => {
    try {
      await setDoc(doc(db, "users", uid), { pin });
    } catch (error) {
      console.error("Error saving PIN:", error);
    }
  };

  // Fetch PIN from Firestore
  const fetchPinFromFirestore = async (uid) => {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserPin(data.pin || "");
        return data.pin || "";
      }
      return "";
    } catch (error) {
      console.error("Error fetching PIN:", error);
      return "";
    }
  };

  // Create new user
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const userLogin = async (email, password) => {
    setLoading(true);
    await setPersistence(auth, browserSessionPersistence);
    const res = await signInWithEmailAndPassword(auth, email, password);
    const pin = await fetchPinFromFirestore(res.user.uid);
    setUserPin(pin); // ensure it's set immediately
    return { user: res.user, pin };
  };

  // Update profile
  const updateUserProfile = (name) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName: name }).then(() => {
        setUser({ ...auth.currentUser, displayName: name });
      });
    }
  };

  // Save PIN after registration
  const registerUserWithPin = async (email, password, pin) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await savePinToFirestore(res.user.uid, pin);
    setUserPin(pin); // immediately set
    return { user: res.user, pin }; // return pin as well
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUserPin("");
    });
  };

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const pin = await fetchPinFromFirestore(currentUser.uid);
        setUserPin(pin);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    user,
    setUser,
    createNewUser,
    registerUserWithPin,
    userLogin,
    updateUserProfile,
    userPin,
    setUserPin,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
