import React, { useState } from "react";
import styles from "./Signup.module.css";
import ApiCall from "../../../utils/ApiCall";

const initialAdminInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [adminInput, setAdminInput] = useState(initialAdminInput);
  const [errors, setErrors] = useState({});

  const handleBlur = (event) => {
    const fieldName = event.target.name;
    const inputValue = event.target.value;

    if (inputValue === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "This field cannot be left empty",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: false,
      }));
    }
  };

  const handleInput = (event) => {
    const fieldName = event.target.name;
    const inputValue = event.target.value;

    setAdminInput((prevAdmin) => ({
      ...prevAdmin,
      [fieldName]: inputValue,
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setErrors({});
    const isFormValid = validateFormInput();
    if (isFormValid) {
      const response = await ApiCall("POST", "/signup", adminInput);
      console.log(response);
      setAdminInput(initialAdminInput);
    }
  };

  const validateFormInput = () => {
    let isFormValid = true;
    const formFields = Object.keys(adminInput);

    formFields.forEach((field) => {
      if (!adminInput[field]) {
        isFormValid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "This field cannot be left empty",
        }));
      }
    });

    if (adminInput.confirmPassword !== adminInput.password) {
      setAdminInput((prevAdmin) => ({
        ...prevAdmin,
        confirmPassword: "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password doesn’t match",
      }));
    }

    return isFormValid;
  };

  return (
    <form onSubmit={handleSubmitForm} className={styles.signupContainer}>
      <div className={styles.fieldInputContainer}>
        <label className={styles.formLabel} htmlFor="inputName">
          Name
        </label>
        <input
          name="name"
          type="text"
          id="inputName"
          className={`${styles.inputField} ${errors.name ? styles.formError : ""}`}
          placeholder={errors.name ? "Invalid name" : ""}
          value={adminInput.name}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.fieldInputContainer}>
        <label className={styles.formLabel} htmlFor="inputEmail">
          Email
        </label>
        <input
          name="email"
          type="text"
          id="inputEmail"
          className={`${styles.inputField} ${errors.email ? styles.formError : ""}`}
          placeholder={errors.email ? "Invalid Email" : ""}
          value={adminInput.email}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.fieldInputContainer}>
        <label className={styles.formLabel} htmlFor="inputPassword">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="inputPassword"
          className={`${styles.inputField} ${errors.password ? styles.formError : ""}`}
          placeholder={errors.password ? "Weak password" : ""}
          value={adminInput.password}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.fieldInputContainer}>
        <label className={styles.formLabel} htmlFor="inputConfirmPassword">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          id="inputConfirmPassword"
          className={`${styles.inputField} ${errors.confirmPassword ? styles.formError : ""}`}
          placeholder={errors.confirmPassword ? "Password doesn’t match" : ""}
          value={adminInput.confirmPassword}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.submitContainer}>
        <button type="submit" className={styles.submitButton}>
          Sign-Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
