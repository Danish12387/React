import './index.css'
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div id="login-page">
            <form className="sign-up-2" id="form-2">
                <h1>Login</h1>
                <div className="main-2">
                    <input type="email" placeholder="Enter your Email" required />
                    <input type="password" placeholder="Password" required id="password-3" />
                    <label id="checkbox"><input type="checkbox" id="checkbox-2" /> Show Password</label>
                    <a href="" id="link" onClick={() => navigate('signup')}>create an account?</a>
                </div>
                <button className="btn" >Login</button>
            </form>
        </div>
    )
}

export default Login;