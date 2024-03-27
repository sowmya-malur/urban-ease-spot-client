
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const errorMessage = "This field is required";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false); // this or user info
    const [userInfo, setUserInfo] = useState({});

    return(
        <>
        <h1> Welcome Back!</h1>
        <p>Login below or <Link to="/">create an account</Link></p>
        <form>
            <label htmlFor="email">Email</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="johnsmith@example.com"
            />
            <label htmlFor="password">Password</label>
            <input 
            type="password"
            id="password"
            name="password"
            />
            <Link to ="/">Forgot Password</Link>
        </form>
        <button>Sign In</button>
        <Link to="/">Create Account</Link>
        </>
    );
}

export default LoginPage;