import AppRouter from "components/Router";
import React, {useEffect, useState} from 'react'
import {authService} from "myfirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  },[])
  return (
    <>
      {init? <AppRouter isLoggedIn={isLoggedIn}/>: "initializing..."}
      <footer>&copy; Switter {new Date().getFullYear()}</footer>
    </>
    
  );
}

export default App;
