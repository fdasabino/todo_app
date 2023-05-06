import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loginMode, setLoginMode] = useState(true);

  const viewLogin = (status) => {
    setLoginMode(status);
    setError(null);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!loginMode && password !== confirmPassword) {
      setError("Passwords don't match");
      setTimeout(() => {
        setError(null);
      }, 3000);
      clearTimeout();
      return;
    }

    // Signin/Signup logic
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_PREFIX}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // error handling
      if (data.detail) {
        setError(data.detail);
        setTimeout(() => {
          setError(null);
        }, 3000);
        clearTimeout();
      } else {
        setCookies("Email", data.email);
        setCookies("Token", data.token);
        window.location.reload();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_container_box">
        <h2 className="auth_container_box_title">
          {loginMode === true ? "Login to access your tasks" : "Please sign-up"}
        </h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loginMode === false && (
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button
            onClick={(e) => handleSubmit(e, loginMode ? "login" : "signup")}
            className="btn_auth"
            type="submit"
            disabled={email === null || password === null}
          >
            {loginMode ? "Login" : "Sign-up"}
          </button>
          {error && <p>{error}</p>}
        </form>
        <div className="auth_options">
          {loginMode ? (
            <button onClick={() => viewLogin(false)}>Don't have an account?</button>
          ) : (
            <button onClick={() => viewLogin(true)}>Already have an account?</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
