import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Header from "./Header"
import useLocalStorage from "./useLocalStorage";
import axios from 'axios';
import Slider from "./Slider";
import Switch from "@material-ui/core/Switch";
import Quantity from "./QuantityHeader";
export default function ProductComponent({addItemsToCart, cartItems, cartOpen, setCartOpen, setWishList, wishList, loading, setLoading}){



  	const router = useRouter();
	const [url, setUrl] = useState("")

	const [ isMobile, setIsMobile] = useState(false)
	const [ showMore, setShowMore ] = useState(false)
	const [ quantity, setQuantity ] = useState(1)
	const [ productDetails, setProductDetails ] = useLocalStorage("selected_product", {})
	const [ images, setImages ] = useLocalStorage("curProdImages", [])
	const [ warranty, setWarranty ] = useLocalStorage("warrantyPrice", 0)
	const [ heartClass, setHeartClass ] = useState("far fa-heart")
    const [ toners, setToners ] = useLocalStorage("toners", []);
    const [ checkedItems, setCheckedItems ] = useLocalStorage("checkedItemsConfigure", [])

	let initialPrice = useRef(null);
	let refWarranty1Year = useRef(null);
	let refWarranty2Years = useRef(null);
	let id = useRef("")

	function addToCart(){
		console.log(initialPrice.current)
		let newObj = [...cartItems];
		let item = {
			name: productDetails.ShortName_Formated,
			image: images.length > 1 ? images[images.length - 2] : images[0],
			price: parseFloat(initialPrice.current),
			quantity: parseInt(quantity)
		}

		let returnEarly = false;

		//Handle re-insertion of the same item into the cart 
		newObj = newObj.map(x => {
			if(x.name === productDetails.ShortName_Formated){
				x["quantity"] = parseInt(x["quantity"]) + parseInt(quantity)
				returnEarly = true;
				return x;
			}
			return x
		})

		window.gtag('event', 'conversion', {'send_to': 'AW-10834835888/Y3iCCLGgj7ADELDzua4o'});
		
		if(returnEarly){
			addItemsToCart([...newObj])
			setCartOpen(true)

			return
		}else{
			addItemsToCart([...cartItems, item])
			setCartOpen(true)
		}

	}

	function onQuantityChange(e){
		let value = e.target.value;
		
		if(!value) value = 1;

		let _productDetails = {...productDetails, Price: value * initialPrice.current }
		setProductDetails({..._productDetails})
		setQuantity(value)
	}

	function handleWarranty(e){

		if(e.currentTarget.classList.contains("selected")){
			setWarranty(0)
			e.currentTarget.classList.remove("selected")
			return 
		}

		document.querySelectorAll(".war-cont").forEach( x => x.classList.remove("selected"));

		let price = e.currentTarget.dataset.value; 
		setWarranty(+price) 
		e.currentTarget.classList.add("selected")


	}

	function addToWishList(){
		let index = wishList.findIndex(x => x.Matnr === productDetails.Matnr);


		if(index !== -1){
			setWishList( [...wishList.filter(x => x.Matnr !== productDetails.Matnr)] )
		}else{
			setWishList( [...wishList, {...productDetails, url: images[0]}] )
		}
		
	}

	useEffect( () => {
		console.log(quantity)
	}, [quantity])
	function renderDetailsMobile(){

			let keys = Object.keys(productDetails)
			return(
				<div className="product" key={productDetails.Id}>
					<div className="img">
						<img src={productDetails.url} />
					</div>
					<p className="bold f24">{productDetails.Name}</p>

					{keys.map(y => {
						if( y === "Name" || 
							y === "Image" || 
							y === "Price" || 
							y === "id" || 
							y === 'Matnr' ||
							 y === 'Printer Subclass' || 
							 y === 'Fax Function' || 
							 y === 'Scanning Function' || 
							 y === 'SubClass' || 
							 y === 'Class' || 
							 y === 'Thumbnail' || 
							 y === 'timestamp' || 
							 y === 'url' || 
							 y === 'ShortName_Formated' || 
							 y === 'LongName' || 
							 y === 'ShortName') return
						return <p key={y} className="desc-mobile"><span className="bold">{y + ": "}</span>{productDetails[y]}</p>
					})}


					<p className="price bold">${productDetails.Price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
{/*		            <a className="sfLink" href="/special-financing">Special financing ></a><br/>*/}
		            <a href={url} className="start w100" >Configure ></a> 
				</div>
			)
	}

	useEffect( () => {
		if(wishList.findIndex(x => x.Matnr === productDetails.Matnr) !== -1){
			setHeartClass("fas fa-heart")
		}else{
			setHeartClass("far fa-heart")
		}
	}, [wishList])
	
	useEffect( () => {
		let { innerWidth } = window
		if(innerWidth < 1080){
			setIsMobile(true)
		}else{
			setIsMobile(false)
		}

	}, [])

	useEffect( () => {
		initialPrice.current = productDetails.Price
	}, [productDetails])

	useEffect( () => {
		
		document.querySelectorAll(".war-cont").forEach( x => {
			let value = x.dataset.value; 

			if( Number(warranty) === Number(value)){
				x.classList.add("selected")
			}
		})
	}, [warranty])

	useEffect( () => {
		if(router.query.id === undefined) return false

		setUrl(window.location.pathname + "/configure")

		setLoading(true)
		axios.get(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_printer?id=" + router.query.id).then(res => {
			if(res.data.length !== 0){
				let data = res.data[0]
				data.ShortName_Formated = data.ShortName.split(" - ").map(x => x[0].toUpperCase() + x.substr(1, x.length - 1)).join(' ');

				let images = res.data.map(x => x.url);


				console.log(data.ShortName, productDetails.ShortName)
				if(data.ShortName !== productDetails.ShortName){
					let _checkedItems = checkedItems.filter(x => x.type !== 'toner')
					setCheckedItems(_checkedItems)
				}

				console.log(data)
				setImages([...images])
				setProductDetails({...data})
			}

			setLoading(false)
		})
		

	}, [router.query.id])


	useEffect( () => {

	}, [id.current])
	if(!router.query.id || !productDetails.Price){
		return <div></div>
	}


	if(!isMobile){
		return(
			<React.Fragment>
				<div className="flex-gsc">
					<span className="no-action gs-nav" >1. Define your needs</span>
					<span className="no-action gs-nav" >2. Choose one copier</span>
					<span className="no-action gs-nav gs-active" >3. Customize your copier</span>
					<span className="no-action gs-nav" >4. Summarize</span>
				</div>
				<div className="result-info">

					<div className="result-info-first-col">
						<p><i className="far fa-comments"></i></p><p>Need help?<br/><a href="/contact-us">Contact us</a></p>
					</div>

					<div className="result-info-second-col">
						<p style={{paddingRight:'13px'}}><i className="fas fa-truck"></i></p><p style={{whiteSpace: 'nowrap'}}><span style={{}}>Free UPS Ground Shipping.</span><span><br/>
						Free Shipping.<br/>
						* Average ship time, approximately one week <br />
						* Freight requiring LTL to be quoted </span> <br/> </p>
					</div>

				<div className="result-info-fourth-col">
				  <p className="result-info-price">$ {parseFloat((productDetails.Price+warranty)*quantity).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
{/*				  <p className="result-info-price-colored">$ {parseFloat( ((productDetails.Price+warranty)*quantity) / 36).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}<span className="mo">/monthly</span></p>*/}
				</div>

				<div className="result-info-fifth-col">
				  <section><Quantity className="input-width" quantity={quantity} setQuantity={setQuantity} /> </section>
				  <a role="button" className="start m0" onClick={addToCart}>Add to cart</a>
				</div>
				</div>

				<div className="result-stats">
				<div className="result-stats-first-col">
				  <Slider images={images} />
{/*				  <p>
				    <a role="button">View gallery</a> or <a role="button">Watch video</a>
				  </p> */}
				</div>

				<div className="result-stats-second-col">
				  <h3>{ productDetails.ShortName_Formated } <i className={heartClass} onClick={addToWishList}></i></h3>
				  { (productDetails && !productDetails.ShortName_Formated.indexOf("Ink")) &&
				  	<>
					  <p><span className="bold">Speed:</span> {`Up to ${productDetails['Black and White Printing Speed']} ppm color / Up to ${productDetails['Black and White Printing Speed']} ppm black and white`} </p>
					  <p><span className="bold">Duty cycle:</span>{` Up to ${productDetails['Max Pages Per Month'].toLocaleString()} pages / month`}</p>
					</>
				  }
				  <p><span className="bold">Connectivity:</span>{` ${productDetails['Connectivity']}`}</p>
					{productDetails['Interface'] ? <p><span className="bold">Network ready:</span> {productDetails['Interface']}</p> : <></>}
				  {productDetails['Max Printing Resolution'] ? <p><span className="bold">Max Printing Resolution:</span> {productDetails['Max Printing Resolution']}</p> : <></>}
				  <p><span className="bold">Standard memory:</span> {productDetails['Standard Memory']} </p>
				  {productDetails['Standard Media Capacity'] ? <p><span className="bold">Standard paper capacity:</span> {productDetails['Standard Media Capacity']}</p> : <></>}
				  <p><span className="bold">Print quality:</span> Premium quality (10/10)</p>
				  {productDetails['Supported Sizes'] ? <p><span className="bold">Supported sizes:</span> {productDetails['Supported Sizes']}</p> : <></>}

{/*				  <hr className="divider"/>
				  <h3 className="ewarranty">Extend your warranty</h3>
				  <p><a role="button" className="f16">Do I need this?</a></p>

				  <div className={(warranty === 288) ? 'war-cont selected' : 'war-cont'} data-value={288} onClick={handleWarranty} style={{cursor:'pointer'}}>
				    <p>1 year warranty</p>
				    <p>+ $288.00</p>
				  </div>

				  <div className={(warranty === 550) ? 'war-cont selected' : 'war-cont'} data-value={550} onClick={handleWarranty} style={{cursor:'pointer'}}>
				    <p>2 year warranty</p>
				    <p>+ $550.00</p>
				  </div>*/}

				</div>

				</div>

				{/* <div className="what-in-box">
					<h3>What should be in the box?</h3>
					<a href={url}>Configure ></a>

					<div className="wib-col-1">
					  <p>Copy machine</p>
					  <img className='wib-img' src={ images[images.length - 2] }/>
					</div>

					<div className="wib-col-4" style={{backgroundColor: "#F8F8F8"}}>
					  <p>Data USB cable</p>
					  <img src="/images/usb.png" style={{mixBlendMode:'multiply', width:'300px'}}/>
					</div>

					<div className="wib-col-3">
					  <p>Toner cartridge pack</p>
					  <img src="/images/toners.png" />
					</div>


					<div className="wib-col-2">
					  <p>Power cable</p>
					  <img src="/images/power-cable.png" />
					</div>
				</div> */}
				<div className="empty-div"></div>
	      </React.Fragment>
		)
	}else{
		return(
			<>
		      <div className="flex-gsc w100 p0">
		        <span className="no-action gs-nav gs-active w100" >3. Customize your copier</span>
		      </div>

			  <div className="result-info-mobile">
			  	<div className="ifc">
			  		<p className="price bold">$ {parseFloat((productDetails.Price * quantity) + warranty).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
{/*			  		<p className="price bold blue mt0">$ {parseFloat( ((productDetails.Price*quantity) + warranty ) / 36).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}<span className="f12">/monthly</span></p>
			  		<p className="blue">36 months lease</p>*/}
			  	</div>

			  	<div className="ifc">
			  		<a href={url} className="start mb0">Configure ></a>
			  	</div>
			  </div>

			  {!showMore && 
				  <div className="result-info show-more w100">
				  	<a role="button" onClick={() => setShowMore(showMore => !showMore)}>
				  		<span>Show more <i className="fas fa-angle-down"></i></span>
				  	</a>
				  </div>
			  }

			  {
			  	showMore && 
			  		<div className="result-info show-less w100">

						<div className="result-info-first-col nowrap">
							<p><i className="far fa-comments mr10"></i></p><p>Need help?<br/><a href="/contact-us">Contact us</a></p>
						</div>

						<div className="result-info-second-col nowrap">
							<p><i className="fas fa-truck mr10"></i></p><p style={{whiteSpace: 'nowrap'}}>Delivery:<br/> <span><span className="gray">Shipping:</span> $ 41.11</span> <br/> </p>
						</div>

						<div className="result-info-third-col w100">
						  <p><Quantity className="input-width" quantity={quantity} setQuantity={setQuantity} /></p>
						</div>

					  	<a role="button" className="show-more" onClick={() => setShowMore(showMore => !showMore)}>
					  		<span>Show less <i className="fas fa-angle-up"></i></span>
					  	</a>

			  		</div>
			  }	

			  {renderDetailsMobile()}
			</>
		)
	}
}