import './index.css';
import { useNavigate } from "react-router-dom";
import { Createuser } from '../../config/firebase.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

function SingUp() {
    const navigate = useNavigate();
    const [password, setPass] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [showPass, setShowPass] = useState(false);

    const signup = async () => {
        try {
            await Createuser({ email, password, userName })
            navigate('/')
        } catch (e) {
            toast.error(e.message)
        }
    }

    return <div id="sign-up-page">
        <div className="sign-up" id="form-1">
            <h1>Sign Up</h1>
            <div className="signUp_main">
                <input type="text" placeholder="User Name" required onChange={(e) => setUserName(e.target.value)} />
                <input type="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" required id="password-1" type={!showPass ? 'password' : 'text'} onChange={(e) => setPass(e.target.value)} />
                <input placeholder="Enter Password Again" type={!showPass ? 'password' : 'text'} required id="password-2" />
                <label id="checkbox" ><input onClick={() => setShowPass(!showPass)} type="checkbox" id="checkbox-1" /> Show Password</label>
                <a href="/login" id="link">Already have an account?</a>
            </div>
            <button className="btn" onClick={signup}>Sign Up</button>
        </div>
    </div>
}

export default SingUp;