import React, { useState, useEffect, useRef } from "react";

export default function Dropdown({items, placeholder}){

	let [ isOpen, setIsOpen ] = useState(false)
	let [ value, setValue ] = useState('')
	let func = useRef(null);

	function onInput(){
		setIsOpen(true);

		let inputValue = value.toLowerCase();
		let valueSubstring;
		if (inputValue.length > 0) {
			for (let j = 0; j < items.length; j++) {
			  if (!(inputValue.substring(0, inputValue.length) === items[j].substring(0, inputValue.length).toLowerCase())) {
			    //items[j].classList.add('closed');
			  } else {
			    //items[j].classList.remove('closed');
			  }
			}
		} else {
		for (let i = 0; i < items.length; i++) {
		  //items[i].classList.remove('closed');
		}
		}
	}


	function onChange(e){
		setValue(e.target.value)
	}

	function close(e){
		if(e.target.classList.contains("chosen-value")) return
		setIsOpen(false)
	}

	function onClick(e){
		setIsOpen(true)
	}
	useEffect( () => {

		if(func.current === null){
			func.current = close;
		}

		document.removeEventListener('click', func.current)
		document.addEventListener('click', func.current)
	}, [isOpen])
	return(
		<div className="dd">
		  <input 
		  	onChange={onChange} 
		  	type="text" value={value} 
		  	placeholder={placeholder} 
		  	onInput={onInput} 
		  	className="chosen-value"
		  	onClick={onClick}
		  />
		  <ul className={isOpen ? 'value-list open' : 'value-list'} >
		  {
		  	items.map(x => {
		  		return(
		  			<li key={x}>{x}</li>
		  		)
		  	})
		  }
		  </ul>
		</div>
	)
}