import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import "./AuthContainer.scss";

const AuthContainer = () => {
  const [auth, setAuth] = useState({
    login: true,
    register: false,
    reset: false,
  });

  const onResetHandler = () => {
    setAuth((prev) => {
      return { ...prev, reset: true, login: false };
    });
  };
  const onRegisterHandler = () => {
    setAuth((prev) => {
      return { ...prev, register: true, login: false };
    });
  };
  const onLoginHandler = () => {
    setAuth((prev) => {
      return { ...prev, register: false, login: true };
    });
  };
  const onResetCloseHandler = () => {
    setAuth((prev) => {
      return { ...prev, reset: false, login: true };
    });
  };
  return (
    <section className="--flex-center --100vh --bg-grey">
      <div className="container box">
        {auth.login && (
          <Login onReset={onResetHandler} onRegister={onRegisterHandler} />
        )}
        {auth.register && <Register onLogin={onLoginHandler} />}
        {auth.reset && <Reset onClose={onResetCloseHandler} />}
      </div>
    </section>
  );
};

export default AuthContainer;
