import React, { useEffect, useState } from "react";
import loginImg from "../../assets/login.svg";
import useShowPassHook from "../../hooks/useShowPassHook";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = (props) => {
  const [showPassword, setShowPassword] = useShowPassHook(false);

  let [auth, setAuth] = useState({ username: "", pass: "" });
  let [loginDisabled, setLoginDisabled] = useState(true);
  const setUserameHandler = (event) => {
    setAuth((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };
  const setPassHandler = (event) => {
    setAuth((prevState) => {
      return { ...prevState, pass: event.target.value };
    });
  };
  useEffect(() => {
    console.log(auth.pass.length, auth.username.length);
    if (auth.pass.length > 7 && auth.username.length > 0) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [auth]);
  return (
    <div className="main-container --flex-center">
      <div className="img-container">
        <img src={loginImg} alt="login" />
      </div>
      <div className="form-container">
        <form className="--form-control">
          <h2 className="--color-danger --text-center">Login</h2>
          <input
            type="text"
            className="--width-100"
            placeholder="username"
            onInput={setUserameHandler}
          ></input>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              className="--width-100"
              placeholder="password"
              onInput={setPassHandler}
            ></input>
            <span
              className="icon"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button
            className={
              loginDisabled
                ? "--btn --btn-primary --btn-block btn-disabled"
                : "--btn --btn-primary --btn-block "
            }
            disabled={loginDisabled}
          >
            Login
          </button>
          <a href="#" className="--text-sm" onClick={props.onReset}>
            forgot password
          </a>
          <span className="--text-sm --block">
            Don't have an account?
            <a href="#" className="--text-sm" onClick={props.onRegister}>
              Register
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
