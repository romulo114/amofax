import React, { useEffect, useState, useRef } from "react";
import Nav from "./Nav";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";
import Quantity from "./Quantity"

function HeaderDark(){
	return(
		<div className="headerDark">
			<div className="left">
				<span>1 - 973 - 482 - 3700</span>
			</div>

			<div className="right">
				<a href="/">HOME</a>
				<a href="/my-wishlist">MY WISHLIST</a>
{/*				<a href="/support">SUPPORT</a>*/}
				<a href="/contact-us">CONTACT US</a>
			</div>
		</div>
	)
}

function MobileHeaderDark({handleNavigation, handleSearchBar, searchBar, cartItems, addItemsToCart, cartOpen, setCartOpen, calculateAndDisplayTotal}){
	let [ input, setInput ] = useState("")

	function removeItemBy1(name){
		let index = cartItems.findIndex(x => x.name === name); 

		if(index !== -1){
			cartItems[index] = { ...cartItems[index], quantity: cartItems[index].quantity - 1}
			if(cartItems[index].quantity <= 0){
				cartItems = cartItems.filter(x => x.name !== name)
			}
			addItemsToCart([...cartItems])
		}
	}

	function handleCart(){
		setCartOpen(!cartOpen)
	}

	function onKeyDown(e){
		if(e.code === 'Enter'){
			setLoading(true)
			axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/search", {query: searchInput}).then(
				res => {
				let mapped = [];

				let names = {}; 

				if(res.data.length === 0){
					setResults([])
					window.location = '/results'
					return
				}

				res.data.forEach(x => {
					let obj = {};

					if(names[x["t2.ShortName"].trim()]) return; 
					names[x["t2.ShortName"].trim()] = true; 
					obj['Matnr'] = x.Matnr
					obj['Product Name'] = x["t2.ShortName"]
					obj['Speed'] = ''
					obj['Cost Per Color Page'] = 'Unknown'
					obj['Cost Per Black Page'] = 'Unknown'
					obj['Id'] = x.Matnr;
					obj['Image'] = x["i.url"].length > 1 ? x["i.url"][x["i.url"].length - 2] : x["i.url"][0];
					obj['Price'] = x["t2.Price"] === 0 ? 'N/A' : x["t2.Price"];
					obj['Connectivity'] = x['Connectivity']
					obj['Supported Sizes'] = x['Supported Sizes']
					obj["Standard warranty"] = 'One year On - site'

					if(x['Color Printing Speed'] !== 0){
						obj['Speed'] += 'Up to ' + x['Color Printing Speed'] + ' ppm color / '
					}

					if(x['Black and White Printing Speed'] !== 0){
						obj['Speed'] += 'Up to ' + x['Black and White Printing Speed'] + ' ppm black and white'
					}

					if(obj['Speed'] === '') return; 
					
					mapped.push(obj);
				})

				axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_cpp", {results: mapped}).then( res => {

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
					} )

				}
			)
			setSearchInput("")
		}
	}

	return(
		<div className="mobileHeaderDark">

			{searchBar && <>
				
				<input type="text" className="searchInputMobile" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}/> 

				<div className="mobileBars" onClick={handleSearchBar}>
					<i className="fas fa-times"></i>
				</div>
			</>
			}

			{!searchBar && <> 
			<div className="loupe" onClick={ handleSearchBar } >
				<img src="/images/loupewhite.svg" />
			</div>

			<div className="mobileLogo">
				<a href="/"><img src="/images/logo-white.png" className="headerImg" /></a>
			</div>

			<div className="shoppingCartMobile" onClick={handleCart}>
				<span>({cartItems.length})</span>
			</div>

			{cartOpen && 
			<div className='checkoutCart'>
	              {(cartItems.map && cartItems.length !== 0 ) ? cartItems.map( x => <div className='item' key={x.name}>
	                <div className='item-image'>
	                  <span className='quantity'>{x.quantity}</span>
	                  <img src={x.image} alt='Product'/>
	                </div>
	                <div className='item-name'>
	                  <span>{x.name}</span>
	                </div>
	                <div className='item-price'>
	                  <span className='bold'> ${(x.price * x.quantity).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
	                </div>
	                <div className='minus'>
	                  <Quantity quantity={x.quantity} cartItems={cartItems} name={x.name} setCartItems={addItemsToCart}  />
	                </div>
	              </div>) : <h3 className='center no-items'>No items in the cart.</h3> }

				  {cartItems.length !== 0 && calculateAndDisplayTotal()}
				              <p className='center'>SECURE SHOPPING</p>

							  <p className='center'>All orders are processed using an SSL secure connection during the transaction keeping your information secure and confidential</p>
				<a id="checkout-btn" href="/checkout/information">Checkout</a>
			</div>}

			<div className="mobileBars" onClick={handleNavigation}>
				<i className="fas fa-bars"></i>
			</div></>}

		</div>
	)
}

export default function Header({cartItems, cartOpen, setCartOpen, addItemsToCart, loading, setLoading, active}){
	let [ isMobile, setIsMobile ] = useState(false)
	let [ showNavigation, setShowNavigation ] = useState(false)
	let [ searchBar, setSearchBar ] = useState(false)
	let [ searchInput, setSearchInput ] = useState("");
	let [ results, setResults ] = useLocalStorage("results_filtered", [])
	let handler = useRef(null);

	function removeItemBy1(name, value){
		let index = cartItems.findIndex(x => x.name === name); 

		if(index !== -1){
			cartItems[index] = { ...cartItems[index], quantity: value}
			if(cartItems[index].quantity <= 0){
				cartItems = cartItems.filter(x => x.name !== name)
			}
			addItemsToCart([...cartItems])
		}
	}

	function handleNavigation(){
		setShowNavigation(showNavigation => !showNavigation)
	}

	function handleSearchBar(){
		setSearchBar(searchBar => !searchBar)
	}

	function calculateAndDisplayTotal(){
		let total = 0;

		if(!cartItems.forEach) return <></>
		cartItems.forEach(x => total += x.price * x.quantity)

		return(
	        <div className='child-flex-cont'>
	          <div className='left-right-wrapper customSubtotal'>
	            <p className='bold'>Subtotal</p>
	            <p className='bold'> USD {total.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
	          </div>
	        </div>
		)
	}
	
	function closeCartOnOutsideClick(e){
		let el = document.querySelector(".checkoutCart");

		if(!el){
			document.removeEventListener('click', handler.current)
			return;
		}
		
		if(el !== e.target && !el.contains(e.target)){
			setCartOpen(false)
			document.removeEventListener('click', handler.current)
		}
	}

	useEffect( () => {
		let { innerWidth } = window

		if(innerWidth < 1080){
			setIsMobile(true)
		}else{
			setIsMobile(false)
		}

		if(!handler.current){
			handler.current = closeCartOnOutsideClick;
		}

		if(cartOpen){
			document.addEventListener("click", handler.current);
		}

	}, [])

	useEffect( () => {
		if(!cartOpen) return false 
	}, [cartOpen])


	function handleCart(){
		setCartOpen(!cartOpen)
		if(!cartOpen){
			setTimeout( () => document.addEventListener("click", handler.current),0 )
		}
	}

	function onKeyDown(e){
		if(e.code === 'Enter'){
			setLoading(true)
			axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/search", {query: searchInput}).then(
				res => {
				let mapped = [];

				let names = {}; 

				if(res.data.length === 0){
					setResults([])
					window.location = '/results'
					return
				}
				res.data.forEach(x => {
					let obj = {};

					if(names[x["t2.ShortName"].trim()]) return; 
					names[x["t2.ShortName"].trim()] = true; 
					obj['Matnr'] = x.Matnr
					obj['Product Name'] = x["t2.ShortName"]
					obj['Speed'] = ''
					obj['Cost Per Color Page'] = 'Unknown'
					obj['Cost Per Black Page'] = 'Unknown'
					obj['Id'] = x.Matnr;
					obj['Image'] = x["i.url"].length > 1 ? x["i.url"][x["i.url"].length - 2] : x["i.url"][0];
					obj['Price'] = x["t2.Price"] === 0 ? 'N/A' : x["t2.Price"];
					obj['Connectivity'] = x['Connectivity']
					obj['Supported Sizes'] = x['Supported Sizes']
					obj["Standard warranty"] = 'One year On - site'

					if(x['Color Printing Speed'] !== 0){
						obj['Speed'] += 'Up to ' + x['Color Printing Speed'] + ' ppm color / '
					}

					if(x['Black and White Printing Speed'] !== 0){
						obj['Speed'] += 'Up to ' + x['Black and White Printing Speed'] + ' ppm black and white'
					}

					if(obj['Speed'] === '') return; 
					
					mapped.push(obj);
				})

				axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_cpp", {results: mapped}).then( res => {

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
					} )

				}
			)
			setSearchInput("")
		}
	}

	if(!isMobile){
		return(
			<React.Fragment>
				<HeaderDark />
				{/*<p style={{color:'white', background:'#0c77cc', padding:'5px', marginTop:0,marginBottom:0, textAlign:'center'}}>If you are having any issues with the new website don't hesitate to call us. We would like to know.</p>*/}
				<header className="header">
					<div className="left">
						<a href="/" className="link-logo-container"><img src="/images/logo_v2.png" className="headerImg" /></a>
					</div>

					<div className="right spec">
						<div className="inputWrapper">
							<input type="text" className="searchInput" placeholder="SEARCH" value={searchInput} onChange={
								e => setSearchInput(e.target.value)
							}
							onKeyDown={onKeyDown}
							/>
						</div>

						<div className="headerSeparator"></div>

						<div className="shoppingCart" onClick={handleCart}><span>({cartItems.length})</span></div>

						{cartOpen && 
						<div className='checkoutCart'>
							  <div style={{textAlign:'left', borderBottom:'unset'}}>
							  <i style={{cursor:'pointer', fontSize:'28px', marginRight:'15px'}} className='fa fa-times' onClick={() => setCartOpen(false)} ></i>
							  </div>
				              {(cartItems.map && cartItems.length !== 0 ) ? cartItems.map( x => <div className='item' key={x.name}>
				                <div className='item-image'>
				                  <span className='quantity'>{x.quantity}</span>
				                  <img src={x.image} alt='Product'/>
				                </div>
				                <div className='item-name'>
				                  <span>{x.name}</span>
				                </div>
				                <div className='item-price'>
				                  <span className='bold'> ${(x.price * x.quantity).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
				                </div>
				                <div className='minus'>
				                  <Quantity quantity={x.quantity} cartItems={cartItems} name={x.name} setCartItems={addItemsToCart} />
				                </div>
				              </div>) : <h3 className='center no-items'>No items in the cart.</h3> }

				              {cartItems.length !== 0 && calculateAndDisplayTotal()}

				              <p className='center'>SECURE SHOPPING</p>

							  <p className='center'>All orders are processed using an SSL secure connection during the transaction keeping your information secure and confidential</p>
							<a id="checkout-btn" href="/checkout/information">Checkout</a>
						</div>}
					</div>

				</header>
				
				<Nav active={active}/>
			</React.Fragment>
		)
	}else{
		return(
			<React.Fragment>
				{/*<p style={{color:'white', background:'#0c77cc', padding:'5px', marginTop:0,marginBottom:0, textAlign:'center'}}>If you are having any issues with the new website don't hesitate to call us. We would like to know.</p>*/}
				<MobileHeaderDark 
					handleNavigation={handleNavigation} 
					handleSearchBar={handleSearchBar} 
					searchBar={searchBar}
					cartItems={cartItems}
					addItemsToCart={addItemsToCart} 
					setCartOpen={setCartOpen} 
					cartOpen={cartOpen}
					calculateAndDisplayTotal={calculateAndDisplayTotal}
				/>

				{ showNavigation && 
				<React.Fragment>
					<Nav className="mobile" active={active}/> 

					<div className="headerSeparator mSeparator"></div>

					<div className="internal-nav">
						<a href="/home">HOME</a>
						<a href="/my-wishlist">MY WISHLIST</a>
{/*						<a href="/support">SUPPORT</a>*/}
						<a href="/contact-us">CONTACT US</a>
					</div> 

				</React.Fragment>
				}

			</React.Fragment>			
		)
	}
}