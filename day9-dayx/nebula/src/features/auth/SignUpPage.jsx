import NavBar from "../components/NavBar";
import GoogleIcon from "../../assets/GoogleIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateEmail from "../../utils/validateEmail";
import { createNewUserWithEmailAndPassword } from "../../firebase/services";

function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    if (value.length === 0) {
      setNameError(true);
      setErrorMessage("Enter your name.");
    } else {
      setNameError(false);
      setErrorMessage("");
    }
  }

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

  function createUser() {
    setAuthenticating(true);
    createNewUserWithEmailAndPassword(name, email, password)
      .then(() => {
        setAuthenticating(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("Enter a valid email address.");
            break;
          case "auth/email-already-in-use":
            setErrorMessage("This email is already taken.");
            break;
          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters.");
            break;
          case "auth/too-many-requests":
            setErrorMessage("Too many attempts. Try again later.");
            break;
          case "auth/network-request-failed":
            setErrorMessage(
              "Network error. Check your internet connection and try again."
            );
            break;
          default:
            setErrorMessage("An unknown error occurred. Try again later.");
            break;
        }
      });
  }

  function handleSignUp(e) {
    e.preventDefault();

    // Final safety check when user clicks sign up
    if (name.length === 0) {
      setNameError(true);
      setErrorMessage("Enter your name.");
      return;
    }

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

    createUser();
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

          <label className="label">Name</label>
          <input
            type="text"
            maxLength={150}
            className={!nameError ? "input w-md" : "input input-error w-md"}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />

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

          {(nameError ||
            emailError ||
            passwordError ||
            confirmPasswordError) && (
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
