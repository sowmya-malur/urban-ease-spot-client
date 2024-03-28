import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const errorMessage = "This field is required";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // this or user info
  const [userInfo, setUserInfo] = useState({});

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
    // Add validation for password length?

    // Update state with form errors
    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
    }

    // If there are no errors, verify the user
    if (Object.keys(formErrors).length === 0) {
        console.log("login successful");
      // API call to validate the user in the backend
      localStorage.setItem("isLoggedIn", true);
      // check if the localStorage has meterid -> redirec to parking duration; remove item to localStorage
      // else home page 
      if(localStorage.getItem("selectedMeterId")) {
        navigate("/booking");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <h1>Welcome Back!</h1>
      <p>
        Login below or <Link to="/">create an account</Link>
      </p>
      <form id="login" ref={formRef}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="johnsmith@example.com"
          value={email}
          ref={emailRef}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          ref={passwordRef}
          onChange={handleChange}
        />
        {/* TODO: add eye icon inside the password field */}
        <Link to="/">Forgot Password</Link>
      </form>
      <button onClick={handleSubmit}>Sign In</button>
      <Link to="/">Create Account</Link>
    </>
  );
}

export default LoginPage;
