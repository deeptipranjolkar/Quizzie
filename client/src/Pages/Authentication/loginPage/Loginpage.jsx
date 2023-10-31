import React, { useState } from "react";
import styles from "./Loginpage.module.css";
import ApiCall from "../../../utils/ApiCall";

const initialAdminInput = {
  email: "",
  password: "",
};

const LoginPage = () => {
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
      const response = await ApiCall("POST", "/login", adminInput);
      console.log(response);
      setAdminInput(initialAdminInput);
      if (response.status === "FAIL") {
        setErrors({ apiError: response.message });
      }
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

    return isFormValid;
  };

  return (
    <form onSubmit={handleSubmitForm} className={styles.loginContainer}>
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
          placeholder={errors.password ? errors.password : ""}
          value={adminInput.password}
          onInput={handleInput}
          onBlur={handleBlur}
        />
        {errors.apiError ? (
          <p className={styles.apiCallError}>{errors.apiError}</p>
        ) : null}
      </div>
      <div className={styles.submitContainer}>
        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
