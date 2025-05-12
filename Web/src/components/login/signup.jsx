import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { createUser } from "../../api/userAPI";
import { useAuth } from '../../Context.jsx';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signupError, setSignupError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSignup(data) {
    try {
      const response = await createUser(data);
      if (response.token) {
        login(response.token);
        navigate('/homepage');
      } else {
        throw new Error('No token received after signup');
      }
    } catch (err) {
      console.error("Signup error:", err);
      setSignupError(true);
      setErrorMessage(err.response?.data?.error || "Failed to create account. Please try again.");
    }
  }

  return (
    <div className="login-container">
      {/* signup part */}
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit(handleSignup)}>
          <h2>Sign up now!</h2>

        <input
          className="login-form-input"
          placeholder="Username"
          {...register("username", {
            required: "Username is required"
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            className="login-form-input"
            type="text"
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
          // some light validation for password creations
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long"
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              message: "Password must contain at least one letter, one number, and one special character"
            }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit" className="submit-btn">Create account</button>
        </form>
      </div>
      
      {/* login part thing */}
      <div className="login-right">
        <h2>Have an account?</h2>
        <p>Login now and listen to your favorite books!</p>
        <br/>
        <Link to="/">
          <button className="signup-btn">Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;