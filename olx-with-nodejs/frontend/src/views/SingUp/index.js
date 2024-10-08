import './index.css';
import { useNavigate } from "react-router-dom";
import { Createuser } from '../../config/firebase.js';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateToken } from '../../store/tokenSlice.mjs';
import Axios from 'axios';

function SingUp() {
    const navigate = useNavigate();
    const [password, setPass] = useState();
    const [email, setEmail] = useState();
    const [fullName, setUserName] = useState();
    const [showPass, setShowPass] = useState(true);
    const dispatch = useDispatch();

    // const signup = async () => {
    //     try {
    //         await Createuser({ email, password, userName })
    //         navigate('/dashboard')
    //     } catch (e) {
    //         alert(e.message)
    //     }
    // }

    const signup = async () => {
        try {
            const signupp = await Axios.post("http://localhost:5000/register", {
                email, password, fullName
            })

            if (signupp.data.message == 'Email already exists!') {
                alert('Email already exists!');
                return;
            }

            dispatch(updateToken(signupp.data.data));
            navigate('/');
        } catch (e) {
            alert(e.message)
        }
    }

    return <div id="sign-up-page">
        <div className="sign-up" id="form-1">
            <h1>Sign Up</h1>
            <div className="signUp_main">
                <input type="text" placeholder="User Name" required onChange={(e) => setUserName(e.target.value)} />
                <input type="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" required id="password-1" type={showPass ? 'password' : 'text'} onChange={(e) => setPass(e.target.value)} />
                <input placeholder="Enter Password Again" type={showPass ? 'password' : 'text'} required id="password-2" />
                <label id="checkbox" ><input type="checkbox" id="checkbox-1" onClick={() => setShowPass(!showPass)} /> Show Password</label>
                <a href="/login" id="link">Already have an account?</a>
            </div>
            <button className="btn" onClick={signup}>Sign Up</button>
        </div>
    </div>
}

export default SingUp;