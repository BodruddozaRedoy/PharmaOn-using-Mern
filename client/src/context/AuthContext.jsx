import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import { axiosPublic } from "../hooks/useAxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUser = (updatedUser) => {
    // console.log(updatedUser);
    return updateProfile(auth.currentUser, updatedUser);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      const user = {
        email: currentUser?.email
      }
      axiosPublic.post("/token", user).then((res) => {
        localStorage.setItem("token", res.data.token);
      });
      setLoading(false);
      // console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    email,
    loading,
    createUser,
    loginUser,
    googleLogin,
    setUser,
    updateUser,
    setEmail,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
