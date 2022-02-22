import React, { useContext } from "react";
import Cookies from 'js-cookie'
import { BrowserRouter } from "react-router-dom";
import { Context } from "."
import AppRouter from "./components/AppRouter";
import './App.css';
import NavBar from "./components/NavBar";
import jwtDecode from "jwt-decode";

function App() {
  const {user} = useContext(Context)
  if (Cookies.get("usr") != null){
    if(jwtDecode(Cookies.get("usr")).cookie.user.role === "director")
      user.setIsAdmin(true);
    else if(jwtDecode(Cookies.get("usr")).cookie.user.role === "leader")
      user.setIsLeader(true);
    else
      user.setIsAuth(true);
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
