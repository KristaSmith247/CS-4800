import { React, useState, useEffect } from "react";

export default function Create() {
	const [form, setForm] = useState({
		// default state of account creation form
		username: "",
		password: "",
		passwordConfirmation: "",
		type: "",
	});

	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function onSubmit(e) {
		e.preventDefault();
        const newAccount = {...form};

        const response = await fetch("http://localhost:4000/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        }).catch(error => {
            window.alert(error);
            return;
        });

        const account = await response.json();
        
        setForm({username: "", password: "", passwordConfirmation: "", type: ""});

        console.log("Success");
	}

	return (
		<div>
			<h2>Create Account</h2>
			<form className="create-account" onSubmit={onSubmit}>
				<div className="create-account-div">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						className="input"
						id="username"
						value={form.username}
						onChange={(e) => updateForm({ username: e.target.value })}
					/>
				</div>
                <div className="create-account-div">
                <label htmlFor="password">Password</label>
					<input
						type="text"
						className="input"
						id="password"
						value={form.password}
						onChange={(e) => updateForm({ password: e.target.value })}
					/>
                </div>
                <div className="create-account-div">
                <label htmlFor="passwordConfirmation">Confirm password</label>
					<input
						type="text"
						className="input"
						id="passwordConfirmation"
						value={form.passwordConfirmation}
						onChange={(e) => updateForm({ passwordConfirmation: e.target.value })}
					/>
                </div>
                <div className="create-account-div">
                    <p>Please choose an account type:  </p>
                    <input type="radio" id="general" name="type" value="general"/>
                    <label htmlFor="general">General</label>
                    <input type="radio" id="business" name="type" value="business"/>
                    <label htmlFor="business">Business</label>
                    <input type="radio" id="student" name="type" value="student"/>
                    <label htmlFor="student">Student</label>
                    <input type="radio" id="travel" name="type" value="travel"/>
                    <label htmlFor="travel">Travel</label>
                </div>
			</form>
            <button type="submit" className="submit-button">Submit</button>
            <div className="footer">
                <p>Copyright &copy; 2024</p>
            </div>
		</div>
	);
}
