import React, { useRef, useState } from "react";
import resetImg from "../../assets/forgot.svg";
import { AiOutlineClose } from "react-icons/ai";
const Reset = (props) => {
  const emailValue = useRef("");
  const [emailIsValid, setEmialIsValid] = useState(false);
  const emailIsValidHandler = () => {
    if (emailValue.current.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmialIsValid(true);
    } else {
      setEmialIsValid(false);
    }
  };
  return (
    <div className="main-container --flex-center">
      <div className="form-container reset">
        <form className="--form-control">
          <h2 className="--color-danger --text-center">Reset</h2>

          <input
            type="email"
            className="--width-100"
            placeholder="Email"
            ref={emailValue}
            onInput={emailIsValidHandler}
          ></input>

          <button
            className={
              !emailIsValid
                ? "--btn --btn-primary --btn-block btn-disabled"
                : "--btn --btn-primary --btn-block "
            }
          >
            Reset password
          </button>

          <span className="--text-sm --block --text-center">
            We will send you a reset link!!!
          </span>
          <div className="close" onClick={props.onClose}>
            <AiOutlineClose color="red" />
          </div>
        </form>
      </div>
      <div className="img-container">
        <img src={resetImg} alt="register" />
      </div>
    </div>
  );
};

export default Reset;
