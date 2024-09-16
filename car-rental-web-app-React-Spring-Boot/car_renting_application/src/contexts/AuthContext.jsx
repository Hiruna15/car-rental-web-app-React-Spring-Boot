/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useFirebase } from "./FirebaseContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeNavTab, setActiveNavTab] = useState(1);
  const [verificationState, setVerificationState] = useState({
    sending: false,
    sent: false,
    verified: false,
    showMessage: false,
  });
  const [showLogin, setShowLogin] = useState(true);

  const {
    auth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
  } = useFirebase();

  async function register(username, password, email, mobile) {
    try {
      setVerificationState({
        sending: true,
        sent: false,
        verified: false,
        showMessage: false,
      });

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      setVerificationState((prev) => ({ ...prev, sending: false, sent: true }));

      const intervalId = setInterval(async () => {
        await userCredential.user.reload();
        if (userCredential.user.emailVerified) {
          clearInterval(intervalId);
          await axios.post("http://localhost:8083/RentARide/users", {
            username,
            email,
            password,
            mobile,
          });
          setVerificationState({
            sending: false,
            sent: false,
            verified: true,
            showMessage: true,
          });
          setShowLogin(true);
        }
      }, 3000);
    } catch (error) {
      console.error("Error:", error.message);
      setVerificationState({
        sending: false,
        sent: false,
        verified: false,
        showMessage: false,
      });
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      const res = await axios.get(
        "http://localhost:8083/RentARide/users/user",
        { params: { username: email, password } }
      );

      if (res.data) {
        setUser(res.data);
        navigate("/", { replace: true });
        console.log("Login successful", res.data);
      } else {
        alert("Invalid credentials or user not found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function logOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logOut,
        register,
        activeNavTab,
        setActiveNavTab,
        verificationState,
        setVerificationState,
        showLogin,
        setShowLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
