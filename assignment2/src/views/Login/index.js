import './index.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Signin } from '../../config/firebase.js';

function Login() {
    const navigate = useNavigate();
    const [password, setPass] = useState();
    const [email, setEmail] = useState();

    const signin = async () => {
        try {
            await Signin({ email, password });
            navigate('/dashboard');
        } catch (e) {
            console.error(e); // Log the full error object to the console
            alert(e.message);
        }
    }; 

    return (
        <div id="login-page">
            <form className="sign-up-2" id="form-2">
                <h1>Login</h1>
                <div className="main-2">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email" required />
                    <input onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required id="password-3" />
                    <label id="checkbox"><input type="checkbox" id="checkbox-2" /> Show Password</label>
                    <a href="" id="link" onClick={() => navigate('signup')}>create an account?</a>
                </div>
                <button className="btn" onClick={signin}>Login</button>
            </form>
        </div>
    )
}

export default Login;