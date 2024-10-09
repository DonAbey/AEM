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
    //CHATBOT - dialogflow code ammendments in removeUser()
    removeUser();
    localStorage.removeItem("transaction");
    setUsername(null);
    window.dispatchEvent(new Event('resetChatbot'));
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
