import React, { useState, useEffect} from "react";
import axios from "axios";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function contactUsForm(){

	let [ name, setName ] = useState('');
	let [ email, setEmail ] = useState('');
	let [ message, setMessage ] = useState('')


	function sendEmail(){
		axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/send-email", {name,email,message})
	}

	function changeInput(e, setter){
		let { value } = e.target;

		setter(value)
	}
	return(
		<>
			<div className="equal-width">
				<input name="name" type='text' onChange={ (e) => changeInput(e, setName) } placeholder='Name' />
				<input name="email" type='email' onChange={ (e) => changeInput(e, setEmail) } placeholder='Email' />
			</div>

			<textarea name='message' onChange={ (e) => changeInput(e, setMessage) } placeholder='Message' />

			<button onClick={sendEmail} className='send-email-btn'>Send</button>
		</>
	)
}