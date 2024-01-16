import './index.css';
import { useNavigate } from "react-router-dom";
import { Createuser, onAuth } from '../../config/firebase.js';
import { useState, useEffect } from 'react';

function SingUp() {
    const navigate = useNavigate();
    const [pass, setPass] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();

    const signup = () => {
        Createuser(email, pass)
    }

    useEffect(() => {
        onAuth()
        }, [])
        
        
    return <div id="sign-up-page">
        <form className="sign-up" id="form-1">
            <h1>Sign Up</h1>
            <div className="signUp_main">
                <input type="text" placeholder="User Name" required onChange={(e) => setUserName(e.target.value)} />
                <input type="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required id="password-1" onChange={(e) => setPass(e.target.value)} />
                <input type="password" placeholder="Enter Password Again" required id="password-2" />
                <label id="checkbox"><input type="checkbox" id="checkbox-1" /> Show Password</label>
                <a href="/" id="link">Already have an account?</a>
            </div>
            <button className="btn" onClick={signup}>Sign Up</button>
        </form>
    </div>
}

export default SingUp;