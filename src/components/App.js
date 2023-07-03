import AppRouter from "./Router";
import React, {useState,useEffect} from 'react'
import authService from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
  useEffect(()=>{
    authService.onAuthStateChanged((user) => console.log("왜안나오지?",user))
  },[]);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Switter {new Date().getFullYear()}</footer>
    </>
    
  );
}

export default App;
