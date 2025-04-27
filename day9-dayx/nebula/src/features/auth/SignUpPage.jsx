import NavBar from "../components/NavBar";
import GoogleIcon from "../../assets/GoogleIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import validateEmail from "../../utils/validateEmail";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
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

  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError(true);
      setErrorMessage("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
      setErrorMessage("");
    }
  }

  function handleSignUp(e) {
    e.preventDefault();

    // Final safety check when user clicks sign up
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

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setErrorMessage("Passwords do not match.");
      return;
    }

    console.log("Signing up with:", { email, password });
    // Proceed with signup logic here
  }

  return (
    <div className="">
      <NavBar></NavBar>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-md border w-md p-4 font-jakarta">
          <h1 className="text-2xl font-bold text-center">
            Hi there, Welcome to Nebula.
          </h1>
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
            minLength={8}
            maxLength={64}
            className={!passwordError ? "input w-md" : "input input-error w-md"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <label className="label">Confirm password</label>
          <input
            type="password"
            minLength={8}
            maxLength={64}
            className={
              !confirmPasswordError ? "input w-md" : "input input-error w-md"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          {(emailError || passwordError || confirmPasswordError) && (
            <p className="text-error text-sm">{errorMessage}</p>
          )}

          <button className="btn btn-primary mt-4" onClick={handleSignUp}>
            Sign up
          </button>

          <button className="btn bg-white text-black">
            <GoogleIcon></GoogleIcon>
            Sign up with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-primary" to={"/login"}>
              Login.
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}

export default SignUpPage;
