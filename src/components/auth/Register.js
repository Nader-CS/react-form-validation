import React, { useState, useEffect, useRef } from "react";
import registerImg from "../../assets/register.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import Tooltip from "../tooltip/Tooltip";
import useShowPassHook from "../../hooks/useShowPassHook";

const Register = (props) => {
  const [showPassword, setShowPassword] = useShowPassHook(false);

  const [showIndicator, setShowIndicator] = useState(false);
  const [pass, setPass] = useState("");
  const emailValue = useRef("");
  const [validPass, setValidPass] = useState({
    passLetter: false,
    passNumber: false,
    passChar: false,
    passLength: false,
  });

  const showIndicatorHandler = () => {
    setShowIndicator(true);
  };
  const setPassHandler = (event) => {
    setPass(event.target.value);
  };
  const hoverHandler = () => {
    setIsHovered(true);
  };
  const unhoverHandler = () => {
    setIsHovered(false);
  };
  const buttonDisableHnalder = () => {
    if (
      !validPass.passChar ||
      !validPass.passLength ||
      !validPass.passLetter ||
      !validPass.passNumber ||
      !emailIsValid ||
      emailValue.current.value.length < 1
    ) {
      console.log(emailValue.current.value);
      return true;
    } else {
      return false;
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [emailIsValid, setEmialIsValid] = useState(true);
  const isHoveredHandler = () => {};
  const emailIsValidHandler = (event) => {
    if (
      event.target.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ||
      event.target.value.length < 1
    ) {
      setEmialIsValid(true);
    } else {
      setEmialIsValid(false);
    }
  };
  useEffect(() => {
    //check lower and uppercase
    if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setValidPass((prevState) => {
        return { ...prevState, passLetter: true };
      });
    } else {
      setValidPass((prevState) => {
        return { ...prevState, passLetter: false };
      });
    }

    //check for numbers
    if (pass.match(/([0-9])/)) {
      setValidPass((prevState) => {
        return { ...prevState, passNumber: true };
      });
    } else {
      setValidPass((prevState) => {
        return { ...prevState, passNumber: false };
      });
    }

    //check for special char
    if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setValidPass((prevState) => {
        return { ...prevState, passChar: true };
      });
    } else {
      setValidPass((prevState) => {
        return { ...prevState, passChar: false };
      });
    }

    //check length
    if (pass.length > 7) {
      setValidPass((prevState) => {
        return { ...prevState, passLength: true };
      });
    } else {
      setValidPass((prevState) => {
        return { ...prevState, passLength: false };
      });
    }
  }, [pass]);

  return (
    <div className="main-container --flex-center">
      <div className="form-container">
        <form className="--form-control">
          <h2 className="--color-danger --text-center">Register</h2>
          <div>
            <input
              type="text"
              className="--width-100"
              placeholder="Username"
            ></input>
          </div>
          <div className="email">
            <input
              type="email"
              className="--width-100"
              placeholder="Email"
              onInput={emailIsValidHandler}
              ref={emailValue}
            ></input>
            {!emailIsValid && (
              <span
                className="icon"
                onMouseOver={hoverHandler}
                onMouseOut={unhoverHandler}
              >
                {<BiErrorCircle color="red" />}
              </span>
            )}
            {isHovered && <Tooltip text="Email Not valid!" />}
          </div>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              className="--width-100"
              placeholder="password"
              onFocus={showIndicatorHandler}
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
            disabled={buttonDisableHnalder()}
            className={
              buttonDisableHnalder()
                ? "--btn --btn-primary --btn-block btn-disabled"
                : "--btn --btn-primary --btn-block "
            }
          >
            Register
          </button>

          <span className="--text-sm --block">
            Have an account?
            <a href="#" className="--text-sm" onClick={props.onLogin}>
              Login
            </a>
          </span>
          <div className={showIndicator ? "show-indicator" : "hide-indicator"}>
            <ul className="--list-style-none --card --bg-grey --text-sm --p">
              <p className="--text-sm">Password Strength indicator</p>
              <li className={validPass.passLetter ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {validPass.passLetter ? <FaCheck /> : <GoDotFill />}
                  &nbsp; Lowercase & Uppercase
                </span>
              </li>
              <li className={validPass.passNumber ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {validPass.passNumber ? <FaCheck /> : <GoDotFill />}
                  &nbsp; Numbers (0-9)
                </span>
              </li>
              <li className={validPass.passChar ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {validPass.passChar ? <FaCheck /> : <GoDotFill />}
                  &nbsp; Special characters(!@#$%^&*)
                </span>
              </li>
              <li className={validPass.passLength ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {validPass.passLength ? <FaCheck /> : <GoDotFill />}
                  &nbsp; At least 8 characters
                </span>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div className="img-container">
        <img src={registerImg} alt="register" />
      </div>
    </div>
  );
};

export default Register;
