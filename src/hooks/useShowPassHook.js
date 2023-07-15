import React, { useState } from "react";

const useShowPassHook = (showState) => {
  const [showPassword, setShowPassword] = useState(showState);
  const togglePasswordHandler = (state) => {
    setShowPassword(state);
  };
  return [showPassword, togglePasswordHandler];
};

export default useShowPassHook;
