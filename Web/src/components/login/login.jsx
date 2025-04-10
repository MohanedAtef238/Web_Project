import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  function handleLogin(data) {
    //fix logic later
    const username = data.email;

    if (username.toLowerCase() === 'admin') {
      navigate('/admin');
    } else if (username !== '') {
      navigate(`/profile/${username}`);
    } else {
      setLoginError(true);
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <h2>Login to Your Account</h2>

          <input
            className="login-form-input"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_-]{3,}$/,
                message: "Invalid username",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            className="login-form-input"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          {loginError && (
            <p className="error">
              Email or password incorrect. Try again or sign up.
            </p>
          )}

          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>

      <div className="login-right">
        <h2>New Here?</h2>
        <p>Sign up and discover a great amount of new opportunities!</p>
        <Link to="/signup">
          <button className="signup-btn">Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
