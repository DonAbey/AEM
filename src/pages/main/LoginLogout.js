import React from "react";
import { useState } from "react";
import { getUser, removeUser, getData } from "../../data/repository";

const LoginLogout = () => {
  const [username, setUsername] = useState(getUser());
  const loginUser = (username) => {
    setUsername(username);
    console.log(username);
  };
  const logout = () => {
    removeUser();
    localStorage.removeItem("transaction");
    setUsername(null);
    //CHATBOT - dialogflow code ammendments
    localStorage.setItem('greetingDisplayed', 'false');
    //sessionStorage.removeItem('df-messenger-sessionID');
    //
  };
  const getActiveUser = () => {
    if (username !== null) {
      return getData("activeUser");
    }
    return null;
  };
  return { username, loginUser, logout, getActiveUser };
};

export default LoginLogout;
