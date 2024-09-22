import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		message: "" // will tell if valid username
	});
	const [invalidMessage, setInvalidMessage] = useState("");

	const navigate = useNavigate();

	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function onSubmit(e) {
		e.preventDefault();

		const existingAccount = { ...form };

		const response = await fetch("http://localhost:4000/accounts/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(existingAccount),
		}).catch((error) => {
			console.log("ERROR: Unable to fetch");
			window.alert(error);
			return;
		});

		const account = await response.json();

		setForm({ username: "", password: "", message: account.message });

		if (account.message == null) {
			localStorage.setItem("username", account._id);
			localStorage.setItem("type", account.type);

			console.log("Logged in successfully");
			navigate("/account/" + account._id);
		}

		setInvalidMessage(
			"Invalid username or password. Please enter and try again."
		);
	}

	return (
		<div className="container">
			<h3>Login</h3>
			<form onSubmit={onSubmit}>
				<label htmlFor="username" className="form-label">
					Username
				</label>
				<input type="text" placeholder="Please enter username" 
				onChange={(e) => updateForm({username: e.target.value})}/>

				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input type="text" placeholder="Please enter password"
				onChange={(e) => updateForm({password: e.target.value})} />

				<br />

				<button type="submit">Submit</button>
			</form>
			{invalidMessage}
			<br />
			<label>Don't have an account?</label>
			<button>
				<a href="/create">Sign Up</a>
			</button>
			<div className="footer">
				<p>Copyright &copy; 2024 Language App</p>
			</div>
		</div>
	);
}

export default Login;
