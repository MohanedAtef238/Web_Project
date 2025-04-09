import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

return (
  <div className="login-container">
    {/* login part */}
    <div className="login-left">
      <form className="login-form">
        <h2>Login to Your Account</h2>

        <input
          className="login-form-input"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email",
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
    
{/* signup part thing */}
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