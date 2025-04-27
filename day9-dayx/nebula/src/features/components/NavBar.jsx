import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";

function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between px-7">
      <div className="">
        <Link className="text-xl font-jakarta font-bold" to={"/"}>
          Nebula
        </Link>
      </div>
      <div className="">
        <Link className="btn border-none" to={"/login"}>
          Log In
        </Link>
        <Link className="btn btn-primary border-none mx-2" to={"/signup"}>
          Sign Up
        </Link>
        <ThemeChanger></ThemeChanger>
      </div>
    </div>
  );
}

export default NavBar;
