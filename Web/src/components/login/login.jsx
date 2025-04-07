// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";

// import './login.css'

// function Login() {
//   const {
//     register,
//     formState: { errors },
//   } = useForm();
//   const [loginError, setLoginError] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="container-fluid">
//         <form className="form-group" >
//           <h3 className="title" id="logInTitle">Login to your account</h3>
//           <div style={{ textAlign: "left" }}>
//             <label>Email</label>
//             <br />
//             <input
//               className="text-input-field"
//               type="email"
//               placeholder="johndoe@gmail.com"
//               id="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Invalid email",
//                 },
//               })}
//             />
//             {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
//             <br />

//             <label>Password</label>
//             <br />
//             <input
//               className="text-input-field"
//               type="password"
//               placeholder="Enter your password"
//               id="password"
//               {...register("password", { required: "Password is required" })}
//             />
//             {errors.password && (
//               <p style={{ color: "red" }}>{errors.password.message}</p>
//             )}
//             <br />
//           </div>
//           {loginError && (
//             <p style={{ color: "red" }}>
//               Username or password are incorrect. Please try again or sign up.
//             </p>
//           )} 
//            <button type="submit" style={{ marginTop: 12 }}>
//             Submit
//           </button>
//         </form>

//         <hr />

//         <Link to="/signup">New user? Sign up!</Link>
//       </div>
//     </div>
//   );
// }

// export default Login;


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