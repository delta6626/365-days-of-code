import NavBar from "../components/NavBar";
import GoogleIcon from "../../assets/GoogleIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import validateEmail from "../../utils/validateEmail";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    if (value.length === 0 || !validateEmail(value)) {
      setEmailError(true);
      setErrorMessage("Enter a valid email.");
    } else {
      setEmailError(false);
      setErrorMessage("");
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (value.length >= 0 && value.length < 8) {
      setPasswordError(true);
      setErrorMessage("Password must be at least 8 characters.");
    } else {
      setPasswordError(false);
      setErrorMessage("");
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    // Final safety check when user clicks login
    if (!validateEmail(email)) {
      setEmailError(true);
      setErrorMessage("Enter a valid email.");
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    console.log("Logging in with:", { email, password });
    // Proceed with login logic here
  }

  return (
    <div className="">
      <NavBar></NavBar>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-md border w-md p-4 font-jakarta">
          <h1 className="text-2xl font-bold text-center">Hey, Welcome back.</h1>
          <p className="text-center text-sm mb-4">
            Fill in your details to continue.
          </p>
          <label className="label">Email</label>
          <input
            type="email"
            className={!emailError ? "input w-md" : "input input-error w-md"}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className={!passwordError ? "input w-md" : "input input-error w-md"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {(emailError || passwordError) && (
            <p className="text-error text-sm">{errorMessage}</p>
          )}
          <button className="btn btn-primary mt-4" onClick={handleLogin}>
            Login
          </button>
          <button className="btn bg-white text-black">
            <GoogleIcon></GoogleIcon>
            Log in with Google
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link className="text-primary" to={"/signup"}>
              Sign up.
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}

export default LogInPage;
