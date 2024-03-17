import './index.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Signin } from '../../config/firebase.js';
import { useDispatch } from "react-redux";
import { updateToken } from '../../store/tokenSlice.mjs';
import Axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [password, setPass] = useState();
    const [email, setEmail] = useState();
    const [showPass, setShowPass] = useState(true);
    const dispatch = useDispatch();

    // const signin = async () => {
    //     const userInfo = { email, password };

    //     try {
    //         await Signin(userInfo);
    //         navigate('/');
    //     } catch (error) {
    //         console.error(error);

    //         if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
    //             alert('Invalid email address');
    //         } else if (error.code === 'auth/wrong-password') {
    //             alert('Invalid password');
    //         } else {
    //             alert('An error occurred during login. Please try again.');
    //         }
    //     }
    // };

    const signin = async () => {
        try {
            const loginn = await Axios.put("http://localhost:5000/login", {
                email, password
            })

            if (loginn.data.message == 'User Not Found!') {
                alert('Invalid email address');
                return;
            }

            if (loginn.data.message == 'Invalid Password!') {
                alert('Invalid password');
                return;
            }
            
            dispatch(updateToken(loginn.data.token));

            navigate('/');

        }
        catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div id="login-page">
            <div className="sign-up-2" id="form-2">
                <h1>Login</h1>
                <div className="main-2">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email" required />
                    <input onChange={(e) => setPass(e.target.value)} placeholder="Password" type={showPass && 'password'} required />
                    <label id="checkbox" onClick={() => setShowPass(!showPass)} ><input type="checkbox" id="checkbox-2" /> Show Password</label>
                    <a href="" id="link" onClick={() => navigate('/signup')}>create an account?</a>
                </div>
                <button className="btn" onClick={signin}>Login</button>
            </div>
        </div>
    )
}

export default Login;