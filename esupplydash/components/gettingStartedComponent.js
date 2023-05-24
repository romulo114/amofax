import React, { useState, useEffect } from "react";
import View1 from "./View1";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";

export default function gettingStartedComponent({setLoading}){
	let [ step, setStep ] = useState(1)
	let [ isMobile, setIsMobile] = useState(false)
	let [ quizzStarted, setStartQuizz ] = useState(false)
	let [ results, setResults ] = useLocalStorage("results_filtered", [])
	let [ viewError, setViewError ] = useState(false)

	let sections = [
		{
			name:"sections1",
			question: "1. What type of prints do you need?",
			answers:[
				{
					id: "1",
					name: "copies",
					text: "Color"
				},
				{
					id: "2",
					name: "copies",
					text: "Black and white only"
				}
			]
		},
		{
			name:"sections1-1",
			question: "2. For what purpose will you be using the printer?",
			answers:[
				{
					id: "3",
					name: "usage",
					text: "Business"
				},
				{
					id: "4",
					name: "usage",
					text: "Office"
				},
				{
					id: "5",
					name: "usage",
					text: "Small-ofice"
				},
				{
					id: "6",
					name: "usage",
					text: "Personal use"
				}
			]
		},
		{
			name:"sections1-2",
			question: "3. Price range?",
			answers:[
				{
					id: "7",
					name: "prange",
					text: "up to $500"
				},
				{
					id: "8",
					name: "prange",
					text: "$500 - $,1000"
				},
				{
					id: "9",
					name: "prange",
					text: "$1,000 - $2,000"
				},
				{
					id: "10",
					name: "prange",
					text: "more than $2,000"
				}
			]
		}
	]

	let sections2 = [
		{
			name:"sections2",
			question: "4. Volume (prints per month)",
/*			link: "<a class='gsc-link copier-volume'>What copier volume is right for me?</a>",*/
			answers:[
				{
					id: "11",
					name: "cpm",
					text: "less than 5,000"
				},
				{
					id: "12",
					name: "cpm",
					text: "5,000 - 10,000"
				},
				{
					id: "13",
					name: "cpm",
					text: "10,000 - 20,000"
				},
				{
					id: "14",
					name: "cpm",
					text: "20,000 - 50,000"
				},
				{
					id: "15",
					name: "cpm",
					text: "More than 50,000"
				}
			]
		},
		{
			name: "sections2-1",
			question: "5. How many reams of paper do you use in a month?",
/*			link: "<a href='/what-sizes-can-i-copy' class='gsc-link'>What sizes can I copy?</a>",*/
			note: 'This will help us determine value.',
			answers:[
				{
					id: "15421",
					type: 'input',
					placeholder:'Number',
					name: 'reams-of-paper'
				}
			]
		},
		{
			name: "sections2-2",
			question: "6. Other than Letter - 8 x 11 inches, \n\n what other size of paper will you require?",
/*			link: "<a href='/what-sizes-can-i-copy' class='gsc-link'>What sizes can I copy?</a>",*/
			answers:[
				{
					id: "26",
					name: "sizescopy",
					text: "Legal - 8 x 14 inches"
				},
				{
					id: "27",
					name: "sizescopy",
					text: "Ledger - 11 x 17 inches"
				},
				{
					id: "28",
					name: "sizescopy",
					text: "Ledger Plus - 12 x 18 inches"
				}
			]
		}

	]

	let sections3 = [
		{
			name: "sections3",
			question: "7. Print copier speed",
/*			link: "<a class='gsc-link' href='/find-the-right-copier-speed'>What copier speed is right for me?</a>",*/
			answers:[
				{
					id: "19",
					name: "ppm",
					text: "Less than 20 Pages Per Minute"
				},
				{
					id: "20",
					name: "ppm",
					text: "21 - 35 ppm"
				},
				{
					id: "21",
					name: "ppm",
					text: "36 - 50 ppm"
				},
				{
					id: "22",
					name: "ppm",
					text: "51 - 65 ppm"
				},
				{
					id: "23",
					name: "ppm",
					text: "More than 66 ppm"
				}
			]
		},
		{
			name:"sections3-1",
			question: "8. Connectivity",
/*			link: "<a href='/learn-more' class='gsc-link'>Learn more</a>",*/
			answers:[
				{
					id: "18",
					name: "cn",
					text: "Wireless (will limit selection)"
				}
			]
		}
	]

	let sections4 = [
		{
			name:"sections4",
			question: "9. Copier features",
/*			link: "<a class='gsc-link' href='/find-the-right-copier-features'>What copier features are right for me?</a>",*/
			answers:[
				{
					id: "29",
					name: "copier-features",
					text: "I only need printing"
				},
				{
					id: "30",
					name: "copier-features",
					text: "Scanner"
				},
				{
					id: "31",
					name: "copier-features",
					text: "Fax machine"
				}
			]
		},
		{
			question: "10. Finishing options",
/*			link: "<a href='/finishing-options' class='gsc-link'>Learn more</a>",*/
			answers:[
				{
					id: "34",
					name: "finishing-options",
					text: "Staple"
				},
				{
					id: "35",
					name: "finishing-options",
					text: "Hole punch"
				},
				{
					id: "36",
					name: "finishing-options",
					text: "Folding"
				},
				{
					id: "37",
					name: "finishing-options",
					text: "Saddle - stitch binding"
				},
				{
					id: "38",
					name: "finishing-options",
					text: "None"
				}
			]
		}
	]

	useEffect( () => {
		let { innerWidth } = window
		if(innerWidth < 1098){
			setIsMobile(true)
		}else{
			setIsMobile(false)
		}
	}, [])

	function handleNext(e){
		e.preventDefault();
		let section = getSection()
		let sectionName = section[0]['name'];

		let storageJSON; 

		try{
			storageJSON = JSON.parse(window.localStorage[sectionName])
		}catch(e){
			console.log(e)
		}

		if(section.length !== storageJSON.length || storageJSON.some(x => x === null) ){
			setViewError(true)
			return;
		}

		setStep(step + 1);

	}

	function handlePrev(e){
		e.preventDefault();
		setStep(step - 1);
	}

	function getSection(){
		switch (step){
			case 1:
			return sections
			case 2:
			return sections2
			case 3:
			return sections3
			case 4:
			return sections4
		}
	}

	function clearStorage(e){
		//localStorage.clear()
		e.preventDefault()

		let copies = JSON.parse(localStorage.sections1);
		let cpm = JSON.parse(localStorage.sections2);
		let copierFeatures = JSON.parse(localStorage.sections3)
		let ppm = JSON.parse(localStorage.sections4)

		let answers = []

		/* Format JSON to send to the server */ 
		sections.forEach(x => {
			x.answers.forEach( y => {
				copies.forEach(z => {
					if( y.id == z) answers.push(y)
				})
			})
		})

		sections2.forEach(x => {
			x.answers.forEach( y => {
				cpm.forEach(z => {
					if( y.id == z) answers.push(y)
				})
			})
		})

		sections3.forEach(x => {
			x.answers.forEach( y => {
				ppm.forEach(z => {
					if( y.id == z) answers.push(y)
				})
			})
		})

		sections4.forEach(x => {
			x.answers.forEach( y => {
				copierFeatures.forEach(z => {
					if( y.id == z) answers.push(y)
				})
			})
		})

		let reduced = {}

		answers.forEach(x => {
			reduced[x.name] = x.text
		})


		setLoading(true)
		axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/search_printers", reduced).then( res => {
			let mapped = [];

			let names = {}; 

			res.data.forEach(x => {
				let obj = {};

				if(names[x["t2.ShortName"].trim()]) return; 
				names[x["t2.ShortName"].trim()] = true; 
				obj['Matnr'] = x.Matnr
				obj['Product Name'] = x["t2.ShortName"]
				obj['Speed'] = ''
/*				obj['Cost Per Color Page'] = 'Unknown'
				obj['Cost Per Black Page'] = 'Unknown'*/
				obj['Id'] = x.Matnr;
				obj['Image'] = x["i.url"].length > 1 ? x["i.url"][x["i.url"].length - 2] : x["i.url"][0];
				obj['Price'] = x["t2.Price"] === 0 ? 'N/A' : x["t2.Price"];
				obj['Connectivity'] = x['Connectivity']
				obj['Supported Sizes'] = x['Supported Sizes']

				if(x['Color Printing Speed'] !== 0){
					obj['Speed'] += 'Up to ' + x['Color Printing Speed'] + ' ppm color / '
				}

				if(x['Black and White Printing Speed'] !== 0){
					obj['Speed'] += 'Up to ' + x['Black and White Printing Speed'] + ' ppm black and white'
				}

				if(obj['Speed'] === '') return; 
				
				mapped.push(obj);
			})

			window.location = '/results'
/*			axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_cpp", {results: mapped}).then( res => {

				let data = res.data; 

				let __results = [ ...mapped ]; 

				__results.forEach( (x,i,arr) => {
					if(!data[x.Matnr]) return 

					let length = data[x.Matnr].length; 
					__results[i] = {...x, 'Cost Per Color Page': data[x.Matnr][length - 1].cpc || 'Unknown', 'Cost Per Black Page': data[x.Matnr][length - 1].cpb || 'Unknown'}
				})

				__results.sort( (a,b) => {
					let res2 = a['Cost Per Color Page'] 

					if(typeof res2 === 'number') return -1 
					else return 1 
				})


				setResults([ ...__results])
				window.location = '/results'
			} )*/
		})
	}

	useEffect( () => {

	}, [step])


	function startQuizz(){
		setStartQuizz(true)
	}
	if(!isMobile){

		return(
			<React.Fragment>
				<div className="flex-gsc">
					<span className="no-action gs-active gs-nav" >1. Define your needs</span>
					<span className="no-action gs-nav" >2. Choose one copier</span>
					<span className="no-action gs-nav" >3. Customize your copier</span>
					<span className="no-action gs-nav" >4. Summarize</span>
				</div>


				<div className="gsc-cont">
					<div className="flex-gsc-tobottom">
						<h3>Determine what you need from your copier</h3>
{/*						<a href="/learn-more" className="blue">Learn more</a>*/}
						<p>Take a moment to answer a few questions.</p>
					</div>

					<div className="img-gsc">
						<img src="/images/IMG.jpg" />
					</div>
				</div>


				<div className="gsc-right-cont">
					<div className="img-cont">
						<div className="wrapper">
							<div className="img"/>
						</div>	

						<View1 sections={getSection()} error={viewError} setError={ setViewError } /> 

						{ step > 1 && <a role="button" className="prev-gsc" onClick={handlePrev}>{"< Previous"}</a> }
						{ ( step >= 1 && step < 4 ) && <a role="button" className="next-gsc" onClick={handleNext} >Next ></a> }
						{ step === 4 && <a href="/results" onClick={clearStorage} className="start finish-gsc">Continue ></a>}
					</div>
				</div>

			</React.Fragment>
		)
	}else{
		return(
			<>

				<div className="flex-gsc w100 p0">
					<span className="no-action gs-active gs-nav w100" >1. Define your needs</span>
				</div>

				{!quizzStarted && 
				<div className="gsc-cont w100">
					<div className="flex-gsc-tobottom">
						<h3>Determine what you need from your copier</h3>
						{/*<a href="/learn-more" className="blue">Learn more</a>*/}
						<p>Take a moment to answer a few questions.</p>
					</div>

					<div className="img-gsc">
						<img src="/images/IMG.jpg" />
					</div>

					<a className="start mobileBtn w100" role="button" onClick={startQuizz}>Start the quiz > </a>
				</div>
				}

				{
					quizzStarted && <>
						<View1 sections={getSection()} isMobile={isMobile}/> 

						{ step > 1 && <a role="button" className={isMobile ? "prev-gsc gsc-btn-mobile-left" : "prev-gsc"} onClick={handlePrev}>{"< Previous"}</a> }
						{ ( step >= 1 && step < 4 ) && <a role="button" className={isMobile ? "next-gsc gsc-btn-mobile-right" : "next-gsc"} onClick={handleNext} >Next ></a> }
						{ step === 4 && <a href="/results" onClick={clearStorage} className={isMobile ? "start finish-gsc finish-gsc-mobile" : "start finish-gsc"}>Continue ></a>}
					</>
				}
			</>
		)
	}
}