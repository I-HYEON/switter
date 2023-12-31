import React, { useState } from 'react';
import { authService, firebaseInstance } from 'myfirebase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target:{name,value}}=event;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
            //create new account
              data = await authService.createUserWithEmailAndPassword(
                email, password);
            } else {
              data = await authService.signInWithEmailAndPassword(
                email, password);
            }
            console.log('회원가입성공?',data)
            } catch(error) {
                setError(error.message)
            }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
    }
    const onSocialClick = async (event) => {
        console.log(event.target.name)
        const {target:{name}} = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log('popup',data)
    }
    return (
      <div>
        <form onSubmit={onSubmit}>
            <input
            name='email'
            type='text'
            placeholder='Email'
            required
            value={email}
            onChange={onChange}
            />
            <input
            name='password'
            type='password'
            placeholder='password'
            required
            value={password}
            onChange={onChange}
            />
            <input
            type='submit'
            value={newAccount? "Create Account":"Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount? "Sign In" : "Create Account"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
      </div>
    )
}


export default Auth;