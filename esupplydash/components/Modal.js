import React, { useEffect, useState } from "react";

export default function Modal({isOpen, children, onClick}){
	let cl = isOpen ? 'modal modal-show' : 'modal';

	return(
		<div className={cl}>
			<div className='modal-inner'>
				<i class="fas fa-check modal-icon"></i>
				<h1>Success!</h1>
				{children}
				<button onClick={onClick}>Continue</button>
			</div>
		</div>
	)
}