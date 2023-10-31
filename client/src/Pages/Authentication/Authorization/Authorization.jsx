import React, { useState } from "react";
import styles from "./Authorization.module.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";

const Authorization = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <div className={styles.authorizationContainer}>
      <div className={styles.authorizationBox}>
        <h1 className={styles.appIcon}>MyQuizApp</h1>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.authButton} ${isSigningUp ? styles.activeButton : ""}`}
            onClick={() => setIsSigningUp(true)}
          >
            Sign Up
          </button>
          <button
            className={`${styles.authButton} ${!isSigningUp ? styles.activeButton : ""}`}
            onClick={() => setIsSigningUp(false)}
          >
            Log In
          </button>
        </div>
        {isSigningUp ? <SignupPage /> : <LoginPage />}
      </div>
    </div>
  );
};

export default Authorization;
