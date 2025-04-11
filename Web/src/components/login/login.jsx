import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(data) {
    //fix logic later
    const username = data.username;
    const password = data.password;

    try {
      const response = await axios.post(`http://localhost:3000/users/`, {
        inputUsername: username,
        inputPassword: password
      });
      
      if(response.status === 200) {
        const user = response.data;
        if (user.username.toLowerCase() === 'admin') {
          navigate('/admin');
        } else {
          navigate(`/profile/${user.username}`);
        }
      }
    }
    catch( error) {
      console.error("Login error:", error);
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
            placeholder="Email or Username"
            {...register("email", {
              required: "Username or Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._@-]{3,}$/,
                message: "Invalid input",
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
