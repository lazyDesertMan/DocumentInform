import React, { useContext } from "react";
import Cookies from 'js-cookie'
import { BrowserRouter } from "react-router-dom";
import { Context } from "."
import AppRouter from "./components/AppRouter";
import './App.css';
import NavBar from "./components/NavBar";

function App() {
  const {user} = useContext(Context)
  if (Cookies.get("usr") != null)
    user.setIsAuth(true);
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
