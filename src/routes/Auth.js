import React, {useState} from 'react';
import authService from '../fBase';

const Auth = () => {
    console.log("이건찍히나",authService)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        const {target: {name,value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                data = await authService.createUserWithEmailAndPassword(email,password);
            } else {
                data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log("제발",data);
        } catch(error) {
            console.log(error)
        }
    }
    return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="email" type="text" placeholder='Email' required value={email}/>
        <input onChange={onChange} name="password" type="password" placeholder='Password' required value={password}/>
        <input type="submit" value={newAccount? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
    )
} 

export default Auth;