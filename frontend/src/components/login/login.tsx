import React from "react";

function Login() {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log("Login form");
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" />
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
