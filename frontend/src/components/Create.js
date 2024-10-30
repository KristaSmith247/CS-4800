import "./Create.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import { ReactSession } from "react-client-session";

export default function Create() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		type: "",
		message: "", // return if sucessful or error
	});
	const [invalidMessage, setInvalidMessage] = useState("");
	const navigate = useNavigate();

	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		let usernameCheck, passwordCheck, typeCheck = 1;

		console.log("In onSubmit");

		ReactSession.setStoreType("sessionStorage");
		ReactSession.set("username", form.username);
		console.log("Username: " + ReactSession.get("username"));

		console.log(form);

		// username check
		if (!form.username) {
			usernameCheck = 1;
			setInvalidMessage("Please enter a username");
		} else {
			usernameCheck = 0;
		}

		if (!form.type) {
			form.type = "general";
			console.log("Set form to general");
			typeCheck = 0;
		}

		// check to make sure passwords match
		if (form.password.value === form.confirmPassword.value) {
			passwordCheck = 0;
		} else {
			console.log("Password error");
			setInvalidMessage("Passwords must match");
			passwordCheck = 1;
		}

		if (passwordCheck === 0) {
			const newAccount = { ...form };
			delete newAccount.message;

			const response = await fetch("http://localhost:4000/accounts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newAccount),
			}).catch((error) => {
				window.alert(error);
				return;
			});

			const account = await response.json();

			// axios.post('', {username, password, type})
			// .then(result => console.log(result))
			// .catch(err => console.log(err))

			console.log("From create: ");
			console.log(account.username);
			setForm({ username: "", password: "", type: "" });

			if (account.message == null) {
				//navigate(-1);
				console.log("Acconut message null");
			} else {
				console.log("There is an error");
			}
		}
	}

	return (
		<div className="container">
			<h3>New Account</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username" className="form-label">
					Username
				</label>
				<input
					type="text"
					placeholder="Please enter username"
					name="username"
					onChange={(e) => updateForm({ username: e.target.value })}
					required
				/>

				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					type="text"
					placeholder="Please enter password"
					onChange={(e) => updateForm({ password: e.target.value })}
					required
				/>

				<label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
				<input type="text" placeholder="Please confirm password"
					onChange={(e) => updateForm({ confirmPassword: e.target.value })} required />

				<label htmlFor="type" className="form-label">
					Account Type
				</label>
				<select
					name="type"
					id="type"
					onChange={(e) => updateForm({ type: e.target.value })}
					selected="selected"
				>
					<option value="general">General</option>
					<option value="business">Business</option>
					<option value="student">Student</option>
					<option value="travel">Travel</option>
				</select>
				<br />
				{/* <input type="submit" value="Create Account" /> */}
				<button type="submit" value="Create Account" onClick={handleSubmit}>Create Account</button>
			</form>
			{invalidMessage}
		</div>
	);
}
