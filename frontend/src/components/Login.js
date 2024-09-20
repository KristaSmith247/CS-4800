import "./Login.css";
import React from "react";

function Login () {
    return (
    <div className="container">
        <h3>Login</h3>
        <form>
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" placeholder="Please enter username" />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="text" placeholder="Please enter password" />

            <br />
            
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default Login;