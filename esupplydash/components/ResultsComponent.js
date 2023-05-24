import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";

function RenderColumns({results}){

	let [ el, setEl ] = useState([])

	if(!results) return false;

		useEffect( () => {
		let _el = []
		for(let res in results[0]){
			if(res === 'Image' 
				|| res === 'Id' 
				|| res === 'Price' 
				|| res === 'Matnr' 
				|| res === 'Cost Per Black Page' 
				|| res === 'Cost Per Color Page'
				|| res === 'Standard warranty') continue;

			let classN = ''

			if(res === 'Product Name' || res === 'Speed' || res === 'Connectivity'){
				classN = 'bold mgbot'
			}else if(res === 'Supported Sizes'){
				classN = 'bold mgbot2'
			}

			_el.push(
				<p className={ classN !== '' ? classN : 'bold'} key={res.replace(/\s/g, "")}>{res}</p>
			)

		}

		setEl([..._el])
	}, [results])

	return <>{el}</>
	
}

export default function ResultsComponent({setLoading}){

	let elem = useRef(null)
	let elem2 = useRef(null)

	const [ isMobile, setIsMobile] = useState(false)
	const [ results, setResults ] = useLocalStorage("results_filtered", [])
	const [ showGraph, setShowGraph ] = useLocalStorage("showGraph", false)

	useEffect( () => {
		let { innerWidth } = window
		if(innerWidth < 1080){
			setIsMobile(true)
		}else{
			setIsMobile(false)
		}

		setLoading(false)

	}, [])

	useEffect( () => {
		console.log(results)
	}, [results])

	useEffect( () => {
		if(!elem.current) return
		elem.current.onscroll = function(e){
			let imagesDivAbove = elem2.current;
			imagesDivAbove.scrollLeft = elem.current.scrollLeft
		}


		if(document.querySelector(".results-flex-div") && document.querySelector(".results-headers")) document.querySelector(".results-headers").style.height = document.querySelector(".results-flex-div").offsetHeight + "px"

		let div = document.querySelector(".results-flex-div")
		if(!div) return false;

		let width = div.getBoundingClientRect().width;

		let imagesDiv = document.querySelectorAll('.results-images-div');

		if(imagesDiv.length === 1) return false;

		imagesDiv.forEach(x => {
			x.style.width = width + 'px'
		})
	}, [elem.current])

	const [ curProd, setCurProd ] = useState(0);

	function circleNavHandler(ind){
		setCurProd(ind)
	}

	if(!results) return '';

	function renderImages(){
		let el = [];


		if(results.length === 0 ) return false;

		try{
			results.map(x => {
				el.push(
					<div className="results-images-div" key={x.Id}>
						<img className="printer-img" src={x.Image} />
					</div>
				)
			})
		}catch(e){
			
		}

		return el;
	}

	function linkHandler(){
		localStorage.checked1 = "" 
		localStorage.checked2 = ""
		localStorage.checked3 = ""
		localStorage.checked4 = ""
		localStorage.checked5 = ""
		localStorage.checkedItemsConfigure = ""
		localStorage.warrantyPrice = "0";
		localStorage.curProdImages = "[]"
		localStorage.selected_product = "{}"
	}
	function renderDetails(){
		let el = [];


		if(results.length === 0 ) return false;

		try{
			results.map(x => {
				el.push(
					<div className="results-flex-div" key={x.Id}>
			            <p className="mgbot">{x['Product Name']}</p>
			            <p className="mgbot">{x.Speed}</p>
			            <p className="mgbot" >{x["Connectivity"]}</p>
			            <p className='mgbot2'>{x['Supported Sizes']}</p>
			            <p className="price bold">$ {x.Price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
			            <a href={"/item/" +x.Matnr }className="start mb0" onClick={linkHandler}>Select</a> 
					</div>
				)
			})
		}catch(e){

		}

		return el;
	}


	if(results.filter && results.length === 0){
		return (
			<section className="w70 padding-results center">
			        <h3 className="result-h3">We found {results.filter && results.length} copiers based on your search input.</h3>
			        <h4>Please repeat the search with a different input or <a href="/getting-started">click here</a> to see if we can find you a different machine.</h4>	
			</section>
		)
	}
	if(!isMobile){
		return(
			<>
		      <div className="flex-gsc">
		        <span className="no-action gs-nav" >1. Define your needs</span>
		        <span className="no-action gs-nav gs-active" >2. Choose one copier</span>
		        <span className="no-action gs-nav" >3. Customize your copier</span>
		        <span className="no-action gs-nav" >4. Summarize</span>
		      </div>
				<div className="w70">
			        <h3 className="result-h3">We found {results.filter && results.length} copiers based on your criteria</h3>
			        <p className="results-info">Compare them and find the perfect one for your business.</p>


			        <div className="results-images" ref={elem2}>
			        	{renderImages()}
			        </div>

			        <div className="results-headers">
			          <div className="results-headers-div">
			            <RenderColumns results={results} />
			          </div>
			        </div>
			        <div className="results-flex" ref={elem}>

			          {renderDetails() }
{/*			          <div className="results-flex-div">
			            <p>Up to 42 ppm color / 42 ppm black-and-white <br/><br/></p>
			            <p className="colored">3.9 cents</p>
			            <p className="colored">0.9 cents</p>
			            <p>Up to 1200 x 1200 dpi</p>
			            <p>1 GB</p>
			            <p>650 sheets</p>
			            <p>Tray: 8.5 x 14 in<br/><br/>MP Tray: 8.5 x 49.6 in</p>
			            <p>94 lb. cover<br/><br/> 256 g/m</p>
			            <p>Premium quality (10/10)</p>
			            <p>Ethernet <br/><br/> 10/100/1000 Base-T</p>
			            <p className="lastBeforePrice">One year On - site</p>
			            <p className="price bold">$ 624.86</p>
			            <a className="sfLink" href="/special-financing">Special financing ></a><br/><br/> 
			            <a href="/item/3212" className="start mb0" onClick={linkHandler} >Select</a> 
			          </div>*/}
			        </div>
				</div>
			</>
		)
	}else{
		return(
			<>
		      <div className="flex-gsc w100 p0">
		        <span className="no-action gs-nav gs-active w100" >2. Choose one copier</span>
		      </div>
		      <div className="circle-nav-container">
		      	{results.map((x,i) => <div className={i === curProd ? "circle-nav circle-nav-active" : "circle-nav"} onClick={() => circleNavHandler(i)}>{i+1}</div>)}
		      </div>

		      <div className="intro">
		      	<p className="f18">We found {results.length} copiers based on your criteria</p>

		      	<p>Compare them and find the perfect one for your business</p>
		      </div>


				{results.filter && results.filter((x,i) => i === curProd).map(x => {
					let keys = Object.keys(x).filter(y => y !== "Matnr" && y !== "Image" && y !== "Price" && y !== "Id");

					return(
						<div className="product" key={x.id}>
							<div className="img">
								<img src={x.Image} />
							</div>
							<p className="bold f24">{x.Name}</p>

							<p className="price bold">${x.Price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
				            <a className="sfLink" href="/special-financing">Special financing ></a><br/>
				            <a href={"/item/" + x.Id} className="start mb0 w100" onClick={linkHandler} >Select</a> 
						</div>
					)
				})}
			</>
		)
	}
}