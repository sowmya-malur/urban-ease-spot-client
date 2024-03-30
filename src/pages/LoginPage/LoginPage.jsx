// Import libraries
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

// Import styles
import "../LoginPage/LoginPage.scss";

function LoginPage({ setIsLoggedIn }) {

  // Initialize hooks
  const navigate = useNavigate();
  console.log("setIsLoggedIn in login");

  const errorMessage = "This field is required";

   // Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [userInfo, setUserInfo] = useState({});

  // Get reference to the form fields to focus on error entry
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // Event handler for form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Set state based on input field name
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

    // Clear errors and hide error message when the user enters a value
    if (value.trim() !== "") {
      setErrors({});
    }
  };

  // Function to validate fields on submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Initialize form errors object
    let formErrors = {};

    // Check the values from the form. If empty, set the error message and set the focus.
    if (email.trim() === "") {
      emailRef.current.focus();
      formErrors.email = errorMessage;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      emailRef.current.focus();
      formErrors.email = "Invalid email format. Ex: example@example.com";
    }
    if (password.trim() === "") {
      password.current.focus();
      formErrors.password = errorMessage;
    }

    // Update state with form errors
    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
    }

    // If there are no errors, verify the user
    if (Object.keys(formErrors).length === 0) {
      console.log("login successful");
      // API call to validate the user in the backend

      // If login successful...
      // Set isLoggedIn state variable to true
      // Set the value in the localStorage to true to track if the user is logged in or not
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);

      // If the localStorage has meterid, then user was redirected from parking duration page.
      // Redirect the user back to parking duration page after login successful.
      // Otherwise, redirect user back to home page (last visited page).
      let userId = 1; // TODO: del
      if (localStorage.getItem("selectedMeterId")) {
        // navigate(`/booking/${userId}`);
        navigate("/booking");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <main>
      <section className="login">
        <h1 className="login__title">Welcome back!</h1>
        <p>
          Login below or{" "}
          <Link to="/" className="login__create-account">
            create an account
          </Link>
        </p>
        <form id="login" ref={formRef} className="login__form">
          <label htmlFor="email" className="login__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="johnsmith@example.com"
            className="login__input"
            value={email}
            ref={emailRef}
            onChange={handleChange}
          />
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login__input"
            value={password}
            ref={passwordRef}
            onChange={handleChange}
          />
          {/* TODO: add eye icon inside the password field */}
          <Link to="/" className="login__forgot-link">
            Forgot Password
          </Link>
          <button onClick={handleSubmit} className="login__cta">
            Sign In
          </button>
          <Link to="/" className="login__secondary">
            Create Account
          </Link>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
