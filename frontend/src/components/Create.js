import "./Create.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from 'axios';
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

		// ReactSession.setStoreType("sessionStorage");
		// ReactSession.set("username", form.username);
		// console.log("Username: " + ReactSession.get("username"));

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

		console.log(form);

		// check to make sure passwords match
		if (JSON.stringify(form.password.trim()) === JSON.stringify(form.confirmPassword.trim())) {
			passwordCheck = 0;
		} else {
			console.log("Password error");
			setInvalidMessage("Please enter two matching passwords.");
			passwordCheck = 1;
		}

		if (usernameCheck === 0 && passwordCheck === 0) {
			console.log("No errors in form");
			const newAccount = { ...form };
			delete newAccount.message;

			console.log("New account");
			console.log(newAccount);
			try {
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

				console.log("Response");
				console.log(response);
				// if (!response.ok) {
				// 	const message = `An error has occurred: ${response.statusText}`;
				// 	window.alert(message);
				// 	return;
				// }

				const account = await response.json();

				console.log("From create: ");
				console.log(account);

				setForm({ username: "", password: "", type: "" });

				if (account.message == null) {
					navigate(-1);
					console.log("Account message null");
				} else {
					console.log("There is an error");
				}
			}
			catch (error) {
				window.alert(error);
				return;
			}


			// axios.post('http://localhost:4000/accounts/create', { form })
			// 	.then(result => {
			// 		console.log(result);
			// 		const account = result.json();
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 		return;
			// 	});


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
					id="username"
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
					id="password"
					type="text"
					placeholder="Please enter password"
					onChange={(e) => updateForm({ password: e.target.value })}
					required
				/>

				<label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
				<input
					id="confirmPassword"
					type="text"
					placeholder="Please confirm password"
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
