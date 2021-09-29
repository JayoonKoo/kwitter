import React, { useState } from "react";
import {authService} from 'fbase'

const Auth = ({auth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

  function onChange(e) {
		const {target: {name, value}} = e;
		if (name === "email") {
			setEmail(value);
		}
		if (name === "password") {
			setPassword(value);
		}
	}

  async function onSubmit(e) {
    e.preventDefault();
		try {
			if (newAccount) {
				await authService.createUserWithEmailAndPassword(auth, email, password);
			} else {
				await authService.signInWithEmailAndPassword(auth, email, password);
			}
		} catch (error) {
			setError(error.message);
		}
  }

	function toggleSignIn() {
		setNewAccount(prev=> !prev);
	}

	const socialLogin = async (event) => {
		const {target: {name}} = event;
		let provider;
		if (name === "google") {
			provider = new authService.GoogleAuthProvider();
		} else if (name === "github"){
			provider = new authService.GithubAuthProvider();
		}
		try {
			await authService.signInWithPopup(auth, provider);
		} catch (error) {
			console.log(`error`, error);
		}
	}

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
					name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
					name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount? "회원가입": "로그인"} />
				<span onClick={toggleSignIn}>{!newAccount? "회원가입": "로그인"}</span>
				{error}
      </form>
      <div>
        <button onClick={socialLogin} name="google" >Continue with Google</button>
        <button onClick={socialLogin} name="github" >Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
