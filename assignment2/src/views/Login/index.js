import './index.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Signin } from '../../config/firebase.js';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const [password, setPass] = useState();
    const [email, setEmail] = useState();
    const [showPass, setShowPass] = useState(true);

    const signin = async () => {
        const userInfo = { email, password };

        try {
            await Signin(userInfo);
            navigate('/');
        } catch (error) {
            console.error(error);

            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                toast.error('Invalid email address');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Invalid password');
            } else {
                toast.error('An error occurred during login. Please try again.');
            }
        }
    };

    return (
        <div id="login-page">
            <div className="sign-up-2" id="form-2">
                <h1>Login</h1>
                <div className="main-2">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email" required />
                    <input onChange={(e) => setPass(e.target.value)} placeholder="Password" type={showPass ? 'password' : 'text'} required />
                    <label id="checkbox" ><input onClick={() => setShowPass(!showPass)} type="checkbox" id="checkbox-2" /> Show Password</label>
                    <a href="" id="link" onClick={() => navigate('/signup')}>create an account?</a>
                </div>
                <button className="btn" onClick={signin}>Login</button>
            </div>
        </div>
    )
}

export default Login;