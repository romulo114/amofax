import React, { useState } from "react";
import axios from "axios";

function LoginForm(){
	let [ username, setUsername ] = useState('');
	let [ password, setPassword ] = useState('');


	function submit(){
		axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/login', {username, password }, {withCredentials: true}).then( res => {
			if(res.data === 'ok'){
				document.location.pathname = 'admin/dashboard'
			}
		})
	}
	return(
		<div className="loginForm">
			<div className="logo">
				<img src="/images/logo_v2.png" width="250px"/>
			</div>
			<label>
			<p>Username:</p>
			<input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
			</label>
			<label>
			<p>Password:</p>
			<input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
			</label>
			<a role="button" className="start mb0" onClick={submit}>Login</a>
		</div>
	)
}


export default LoginForm