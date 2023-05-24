import React, { useState, Fragment, useEffect } from "react";
import parse, { domToReact } from 'html-react-parser'
import useLocalStorage from "./useLocalStorage";


export default function View1(props){
	let [ gscChecked, setGscChecked ] = useLocalStorage(props.sections[0].name, props.sections.map(x => 0))
	let [ answers, setAnswers ] = useLocalStorage("answers", [])
	let [ reamsValue, setReamsValue ] = useLocalStorage("reamsValue", "");

	function onChangeReams(e){

		if(Number.isNaN(Number(e.target.value))) return;

		let _gscChecked = [ ...gscChecked ]
		_gscChecked[1] = e.target.value === '' ? null : e.target.value;

		setGscChecked([..._gscChecked]);

		setReamsValue(e.target.value)
	}
	useEffect( () => {
		let { name } = props.sections[0];

		setGscChecked( () => {
			try{
				let item = JSON.parse( localStorage.getItem(name) ) ? JSON.parse( localStorage.getItem(name) ) : []
				return item
			}catch(e){
				return []
			}
		})
	}, [props.sections[0].name])

	function handleChange(e,id,i){
		const { name, checked } = e.target;

		let arr = [...gscChecked ]

		arr[i] = id;

		setGscChecked([...arr])

	}

	let [ modalText, setModaltext ] = useState("");

	useEffect( () => {
		if(modalText === ""){
			document.querySelector("body").classList.remove('bg')
		}
	}, [modalText])

	function createModal(){
		let text = [
`Manufacturers design copiers and their parts for particular maximum monthly numbers of copies. 
Higher volume copiers have a more rugged construction. Using a copier for copy volumes beyond their design capacity will likely result in early breakdown.`,
`Matching the copier to your needs will save money and reduce the frequency of malfunctions. 
The volume that you will be printing is one of the strongest indicators of what kind of copier you will need.`,
`If you have a small business that only makes 500 copies a month, you’re not going to need a giant, commercial-grade copy machine. On the other hand, if your business is making thousands of copies a month, a small copier from your local Staples is not going to cut it.`,
`Refer to your copying records, preferably for the last 6–12 months.
Find the average number of copies made per month.
If you already own a copier, the device will have an internal counter. Think of it like an odometer on a car. Somewhere in the menu options, you will be able to display the total number of copies and print jobs.
Keep in mind, your estimate does not need to be exact. Don’t break your neck trying to figure out the exact number of copies your office makes. Just reach an approximate estimate, and then multiply and increase it by x for for a margin of error and an allowance for future growth and provides a buffer against surges in use,.
Estimate a generous monthly copy volume.`
]

		setModaltext(text)

		document.querySelector("body").classList.add("bg")
	}

	function RenderQuestions(){
		return props.sections.map((x,i) => {
			let Parsed; 
			if(x.link){
				Parsed = parse(x.link, {
					replace: ({ attribs, children }) => {
						if(!attribs) return 

						if(attribs.class.split(" ").indexOf("copier-volume") !== -1){
							return <a className={attribs.class} onClick={createModal}>{domToReact(children) }</a>
						}
					}
				})
			}
			return(
				<div className="question" key={x.name}>
					<h4 style={x.note ? {marginBottom:'0'} : {}}>
						{x.question[0] === '6' ? 
							<span>6. Other than Letter - 8 x 11 inches, <br />what other size of paper will you require?</span> :
							<span>{x.question}</span>
						} 

					</h4>
					{ x.note && <p style={{color:'#0070C9', marginBottom:'8px', marginTop:'0', fontSize:'12px', fontWeight:'bold'}}>{x.note}</p> }
					{ x.answers.map( (y) => {
						if(y.type === 'input'){
							return(
								<div key={y.id} style={{height:'28px'}}>
									<input 
										key={y.id}
										placeholder={y.placeholder} 
										className="input-tablet" 
										id={y.name} 
										type="text"
										onChange={onChangeReams}
										value={reamsValue}
									/>
								</div>
							)
						}
						return(
							<div key={y.id}>
								<input className="select" type="radio" id={"opt" + y.id} 
									name={y.name} 
									checked={gscChecked[i] === y.id} 
									onChange={(e) => handleChange(e, y.id, i )}
								/>
								<label htmlFor={"opt" + y.id}>{y.text}</label>
							</div>
						)
					}) }
				</div>
			)
		})
	}

	return(
		<>
		{modalText !== "" && 
			<div className={!props.isMobile ? "modalCustom" : "modalCustom modalCustomMobile"}> 
				<i className="fas fa-times" onClick={ () => setModaltext('') }></i>
				<h4>Copier volume</h4>

				<div className="modal-left">
					<iframe src="https://www.youtube.com/embed/4DbT0r4bihs" />
					<p>By watching this video you will understand a copier volume better.</p>
				</div>

				<div className="modal-right">
					{modalText !== "" && modalText.map(x => <p>{x}</p>) }
				</div>
			</div>
		}
		<div className={!props.isMobile ? "text" : "text mobileText"}>
			{RenderQuestions() }
		</div>
		{props.error && 
			<div className="error-tablet">
				<div className="error-tablet-container">
					<p>Please fill all the fields for a quality result.</p>
					<button type='button' className="start m0" onClick={ () => props.setError(false) }>OK</button>
				</div>
			</div>
		}
		</>
	)
}