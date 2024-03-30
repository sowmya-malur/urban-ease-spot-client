// Import libraries
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

// Import styles
import "../LoginPage/LoginPage.scss";

// Import icons
import errorIcon from "../../assets/icons/error-24px.svg";

function LoginPage({ setIsLoggedIn, setUserId }) {
  // Initialize hooks
  const navigate = useNavigate();

  // Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [activeFields, setActiveFields] = useState({
    email: false,
    password: false,
  });

  // Initialize constants
  const errorMessage = "This field is required";

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
  const handleSubmit = async (event) => {
    try {
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
        passwordRef.current.focus();
        formErrors.password = errorMessage;
      }

      // Update state with form errors
      if (Object.keys(formErrors).length !== 0) {
        setErrors(formErrors);
      }

      // If there are no errors, verify the user
      if (Object.keys(formErrors).length === 0) {
        const userInfo = {
          email: email,
          password: password,
        };

        // Call to validate the user in the backend
        // const response = await axios.get(
        //   `${process.env.REACT_APP_BACKEND_URL}/user`,
        //   userInfo
        // );

        const response = await axios.post(
          "http://localhost:8080/api/user/",
          userInfo
        );

        // If login successful,
        // Set isLoggedIn state variable to true
        // Set the value in the localStorage to true to track if the user is logged in or not
        if (response.data && response.status === 200) {
          // Reset form fields and clear errors
          resetForm();

          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          setUserId(response.data);

          // If the localStorage has meterid, then user was redirected from parking duration page.
          // Redirect the user back to parking duration page after login successful.
          // Otherwise, redirect user back to home page (last visited page).
          if (localStorage.getItem("selectedMeterId")) {
            // navigate(`/booking/${userId}`);
            navigate(`/booking/${response.data}`);
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          exception: error.response.data.message, // missing fields or format error
        });
      } else if (error.response && error.response.status === 404) {
        setErrors({
          exception: error.response.data.message, // did not find the user
        });
      } else if (error.response && error.response.status === 500) {
        setErrors({
          exception: error.response.data.message, // Internal server error
        });
      } else {
        setErrors({
          exception: "Error logging in the user. Please try again later.", // Generic error message
        });
      }
    }
  };

  // Function to reset form fields and clear errors
  const resetForm = () => {
    setEmail("");
    setPassword("");

    // Clear errors
    setErrors({});
  };

  // Event handler for focusing on a form field
  const handleFocus = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: true }));
  };

  // Event handler for blurring out of a form field
  const handleBlur = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: false }));
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
            className={`login__input ${
              (errors.email || activeFields.email) && "login__input--error"
            }`}
            value={email}
            ref={emailRef}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.email && (
            <div className="login__error-message">
              <img src={errorIcon} alt="error icon" />
              {errors.email}
            </div>
          )}
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`login__input ${
              (errors.password || activeFields.password) &&
              "login__input--error"
            }`}
            value={password}
            ref={passwordRef}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.password && (
            <div className="login__error-message">
              <img src={errorIcon} alt="error icon" />
              {errors.password}
            </div>
          )}

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
        {errors.exception && (
          <div className="login__error-message login__error-message--align">
            <img src={errorIcon} alt="error icon" />
            <p>{errors.exception}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default LoginPage;
