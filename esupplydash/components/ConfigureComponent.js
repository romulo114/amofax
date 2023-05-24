import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import ExtrasComponent from "./ExtrasComponent";
import useLocalStorage from "./useLocalStorage";
import axios from 'axios';
import Switch from "@material-ui/core/Switch";
import { withStyles } from '@material-ui/core/styles';
import { purple, blue } from '@material-ui/core/colors';

const PurpleSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '& + $track': { backgroundColor: '#0070ca' },
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#d19e00',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
	const { checked, onChange } = props;
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      checked={checked}
      onChange={onChange}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function ConfigureComponent({noHeader, addItemsToCart, cartItems, cartOpen, setCartOpen}){


	const router = useRouter();
	const { id } = router.query;
	const [ productDetails, setProductDetails ] = useLocalStorage("selected_product", {})
    const [ warranty, setWarranty ] = useLocalStorage("warrantyPrice", 0)
    const [ toners, setToners ] = useLocalStorage("toners", [])
    const [ accessories, setAccessories ] = useLocalStorage("accessories", [])
	const [ images, setImages ] = useLocalStorage("curProdImages", [])
	const [ quantity, setQuantity ] = useState(1)
	const [ trigger, setTrigger ] = useState(false)
	const [ checked, setChecked ] = useState(false);
	const [ classN, setClass ] = useState("")
	const [ class2, setClass2 ] = useState("")
    const [ checkedItems, setCheckedItems ] = useLocalStorage("checkedItemsConfigure", [])
    const [ steps, setStep ] = useState(1)
    const [ positions, setPositions ] = useState(["-100%", "-100%", "-100%", "-100%"])
    const [ topPositions, setTopPositions ] = useState(["0%", "0%", "0%"])
    const [ transforms, setTransforms ] = useState(["translateX(-50%) scale(1.1)", "translateX(-50%) scale(1.1)", "translateX(-50%) scale(1.1)"])

	function handleCheckedChange(e){
		let isChecked = e.target.checked;
		
		setChecked(isChecked)
	}

	useEffect( () => {
		if(checked){
			setClass2("blue")
			setClass("")
			setActiveIndex(3)
		}else{
			setClass("yellow")
			setClass2("")
			setActiveIndex(0)
		}
	}, [checked])
	function goBack(e){
		e.preventDefault();
		router.back()
	}

	function detailsHandler(e){
		e.preventDefalt()
		console.log(router)
	}

	let powerCables = useRef([
		{
			id:1,
			name: "Power cable 6ft",
			price: "9.99",
			url: ["/images/pcable-item.jpg"],
			type: "powerCable"
		},
		{
			id:2,
			name: "Power cable 10ft",
			price: "10.99",
			url: ["/images/pcable-item.jpg"],
			type: "powerCable"
		}
	])


	let USBs = useRef([
		{
			id:1,
			name: "Data USB",
			price: "18.99",
			url: ["/images/usb.png"],
			type: "usb"
		}
	])

	let stands = useRef([
		{
			id:1,
			name: "Desktop Printer Stand with 2 Tier Storage Shelf",
			price: "31.49",
			url: ["https://images-na.ssl-images-amazon.com/images/I/71sfCqOMxTL._AC_SL1500_.jpg"],
			type: "stands"
		}
	])


	let otherOptions = useRef([
		{
			id:1,
			name: "Other option",
			price: "18.99",
			url: ["/images/pcable-item.jpg"],
			type: "otherOption"
		}
	])

	let [ proceed, setProceed ] = useState(false)

	let [ isMobile, setIsMobile] = useState(false)

	let initialPrice = useRef(null);

	useEffect( () => {
		let { innerWidth } = window
		if(innerWidth < 1080){
			setIsMobile(true)
		}else{
			setIsMobile(false)
		}

		if(!initialPrice.current){
			initialPrice.current = productDetails.Price
		}

	}, [])

	useEffect( () => {
		let _initialPrice = productDetails.Price;

		checkedItems.map( x => {
			let priceToAdd = Number(x.price) * x.quantity;

			_initialPrice += priceToAdd;
		});

		setTotalPrice(_initialPrice)

	}, [checkedItems])
	useEffect( () => {
		if(!router.query.id) return false

		axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_toners", {matnr: id}).then(res => {
			let toners = [];

			res.data.forEach(x => {

				console.log(x)
				if(x.url[x.url.length - 1] === '/Content/base/images/DefaultImage.jpg' || x.url === ''){
					x.url = x.imgURL;
				}else{
					x.url = x.url[0]
				}

				let name = '';


				let brand = x.Name.split(" ")[0]

				name += brand;

				name += " - "
				let normalizedTonerName = x.Name.toLowerCase();

				let colors = ["black", "magenta", "cyan", "yellow"];

				let imageValues = {}

				imageValues.Black = "/images/black.png";
				imageValues.Magenta = "/images/magenta.png";
				imageValues.Cyan = "/images/cyan.png";
                imageValues.Yellow = "/images/yellow.png";


				let valuesFound = []

				colors.forEach(x => {
					if(normalizedTonerName.includes(x)){
						let arrayValuesOfString = x.split("")
						arrayValuesOfString[0] = arrayValuesOfString[0].toUpperCase();
						let _name = arrayValuesOfString.join("")

						valuesFound.push(_name)
					}
				});


				let imgSRC = null;

				name += valuesFound.join(", ")

				if(valuesFound.length === 0){
					name += "Black"
				}

				if(valuesFound.length === 1){
					imgSRC = imageValues[valuesFound[0]]
				}else if(valuesFound.length > 1){
					imgSRC = "/images/toners_2.jpg"
				}else if(valuesFound.length === 0){
					imgSRC = "/images/black.png"
				}

				name += " - "

				if(normalizedTonerName.includes("high yield") && !normalizedTonerName.includes("extra")){
					name += "High Yield"
				}else{
					name += "Extra High Yield"
				}

				toners.push({
					id: x.id,
					name: name,
					price: x.Cost,
					url: imgSRC,
					type: 'toner'
				})

			})

			setToners([...toners])
		})

		axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_accessories", {matnr: id}).then(res => {
			let accessories = [];

			res.data.forEach(x => {
				if(x.name === '') return;
				accessories.push({
					id: x.id,
					name: x.name,
					price: x.price,
					url: x.image,
					type:'accessory'
				})
			})

			setAccessories([...accessories])
		})

	}, [router.query.id])



	useEffect( () => {
		var audio = new Audio('/woosh.mp3');

		if(steps === 1 && window.innerWidth > 1156){
			let _positions = [...positions ]



			setTimeout( () => {
				let pos = window.innerWidth >= 1292 ? '10%' : '10%';
				_positions[0] = pos;

				setPositions([..._positions])
				setTimeout( () => audio.play(), 200)
			}, 1000 );

			
			setTimeout( () => {
				let pos = window.innerWidth >= 1292 ? '30%' : '27%';
				_positions[1] = pos;

				audio.play()
				setPositions([..._positions])
			}, 1900);


			setTimeout( () => {
				let pos = window.innerWidth >= 1292 ? '50%' : '43%';
				_positions[2] = pos;

				audio.play();
				setPositions([..._positions]);
			}, 2800);

			setTimeout( () => {
				let pos = window.innerWidth >= 1292 ? '26.5%' : '23%';
				_positions[3] = pos;

				audio.play();
				setPositions([..._positions]);
			}, 2800);

			setTimeout( () => {
/*				let _transforms = transforms;
				_transforms[0] = "translateX(-50%) scale(0.7)"
				_transforms[1] = "translateX(-50%) scale(0.7)"
				_transforms[2] = "translateX(-50%) scale(0.7";*/
				//setTransforms([..._transforms])
			}, 3500)

		}else if(steps === 1 && window.innerWidth <= 1156){
			let _positions = [...positions ]
			let _topPositions = [ ...topPositions ];

			setTimeout( () => {
				let pos = '15%'
				_positions[0] = pos;

				setPositions([..._positions])

				setTimeout( () => audio.play(), 200)
			}, 1000 );

			
			setTimeout( () => {
				let pos = '15%'
				_positions[1] = pos;
				_topPositions[1] = "325px";

				audio.play()
				setPositions([..._positions])
				setTopPositions([..._topPositions]);
			}, 1900);


			setTimeout( () => {
				let pos = '15%'
				_positions[2] = pos;
				_topPositions[2] = "495px";

				audio.play();
				setPositions([..._positions]);
				setTopPositions([..._topPositions]);
			}, 2800);

			setTimeout( () => {
				let pos = '10%'
				_positions[3] = pos;

				audio.play();
				setPositions([..._positions]);
			}, 2800);

		}
	}, [steps])
	useEffect( () => {
		if(trigger){
			console.log(cartItems)
			addToCartWithAccessories()
			setTrigger(false)
		}
	}, [cartItems])
	let [ totalPrice, setTotalPrice ] = useState(productDetails.Price)
	let [ activeIndex, setActiveIndex ] = useState(0)

	function accordionClick(index){
		setActiveIndex(index)
	}

	function generateWarrantyForCheckoutList(){
		if(warranty === 0) return <></> 


		if(warranty > 288){
			return(
				<div className="flex space-between">
					<p className="f18">2 year extended warranty</p>
					<p className="bold f16">$ {warranty.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
				</div>
			)
		}else{
			return(
				<div className="flex space-between">
					<p className="f18">1 year extended warranty</p>
					<p className="bold f16">$ {warranty.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
				</div>
			)			
		}
	}


	function addToCart(){
		let newObj = [...cartItems];

		let item = {
			name: productDetails.ShortName_Formated,
			image: images.length > 1 ? images[images.length - 2] : images[0],
			price: parseFloat(initialPrice.current) + parseInt(warranty),
			quantity: 1
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

		if(returnEarly){
			addItemsToCart([...newObj])
			setCartOpen(true)
			setTrigger(true)
			return
		}else{
			addItemsToCart([...cartItems, item])
			setCartOpen(true)
			setTrigger(true)
		}

	}

	if(!router.query.id){
		return <></>
	}

	function addToCartWithAccessories(){


		let oldItems = [ ...cartItems ];

		let item = {
			name: productDetails.ShortName_Formated,
			image: images.length > 1 ? images[images.length - 2] : images[0],
			price: parseFloat(initialPrice.current) + parseInt(warranty),
			quantity: 1
		}

		let found;

		oldItems.forEach(x => {
			if(x.name === productDetails.ShortName_Formated){
				found = true;
				x.quantity += 1;
			}
		})

		let items = []
		if(!found){
			items.push(item)
		}
		if(checkedItems.length !== 0){

			checkedItems.map(x => {

				let item = {
					name: x.name, 
					image: x.url,
					price: Number(x.price),
					quantity: x.quantity,
					type: 'acc'
				}

				let index = cartItems.findIndex(y => x.name === y.name);

				if(index !== -1){
					cartItems[index].quantity = cartItems[index].quantity + x.quantity 
					addItemsToCart([...cartItems])
					return;
				}

				items.push(item);

			})

			addItemsToCart([...oldItems, ...items]);
		}
	}

	function GenerateEssentials(){
		return(
			<>
				<ExtrasComponent noHeader={noHeader} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setCartOpen={setCartOpen} cartItems={cartItems} addItemsToCart={addItemsToCart} items={USBs.current} id={1} name="Data USB Cables"  isOpen={0 === activeIndex} accordionClick={() => setActiveIndex(0)} />
				<ExtrasComponent noHeader={noHeader} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setCartOpen={setCartOpen} cartItems={cartItems} addItemsToCart={addItemsToCart} items={toners} id={2} name="Toners & Inks"  isOpen={1 === activeIndex} accordionClick={() => setActiveIndex(1)} />
				<ExtrasComponent noHeader={noHeader} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setCartOpen={setCartOpen} cartItems={cartItems} addItemsToCart={addItemsToCart} items={powerCables.current} id={3} name="Power Cables" isOpen={2 === activeIndex} accordionClick={() => setActiveIndex(2)} />
			</>
		)
	}

	function GenerateOptions(){
		return(
			<>
				<ExtrasComponent className="bg-yellow" noHeader={noHeader} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setCartOpen={setCartOpen} cartItems={cartItems} addItemsToCart={addItemsToCart} items={stands.current} id={4} name="Stands"  isOpen={3 === activeIndex} accordionClick={() => setActiveIndex(3)} />
				{accessories.length !== 0 && <ExtrasComponent className="bg-yellow" noHeader={noHeader} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setCartOpen={setCartOpen} cartItems={cartItems} addItemsToCart={addItemsToCart} items={accessories} id={5} name="Misscellaneous"  isOpen={4 === activeIndex} accordionClick={() => setActiveIndex(4)} /> }
			</>
		)
	}

	function GenerateBoth(){
		return(
			<>
				<GenerateEssentials />
				<GenerateOptions />
			</>
		)
	}

	function RenderWhatIsInTheBoxSection(){
			if(!checked){
				return(
				<>
					<div className="wib-col-1-2 customPos1" onClick={ () => setActiveIndex(0) } style={checkedItems.some(x => x.type === 'usb') ? {filter: 'unset', left: positions[0], top: '155px', transform: transforms[0]} : {left: positions[0], top:'155px', transform: transforms[0] }}>
					  <p style={activeIndex === 0 ? {color: '#0070c9'} : {}}>Data USB cable</p>
					  <img src="/images/usb.png" />
					</div>

					<div className="wib-col-3-2 customPos2" onClick={ () => setActiveIndex(1) } style={checkedItems.some(x => x.type === 'toner') ? {filter: 'unset', left: positions[1], transform: transforms[1], top: topPositions[1] !== "0%" ? topPositions[1] : '155px'} : {left: positions[1], transform: transforms[1], top: topPositions[1] !== "0%" ? topPositions[1] : '155px' }}>
					  <p style={activeIndex === 1 ? { color : '#0070c9' } : {}}>Toner cartridge pack</p>
					  <img src="/images/toners_2.jpg" />
					</div>

					<div className="wib-col-2-2 customPos3" onClick={ () => setActiveIndex(2) } style={checkedItems.some(x => x.type === 'powerCable') ? {filter: 'unset', left: positions[2], transform: transforms[2], top: topPositions[2] !== "0%" ? topPositions[2] : '155px'} : {left: positions[2], transform: transforms[2], top: topPositions[2] !== "0%" ? topPositions[2] : '155px'}}>
					  <p style={activeIndex === 2 ? {color: '#0070c9'} : {}}>Power cable</p>
					  <img src="/images/power-cable.png" />
					</div>
				</>
				)
			}else{
				return(
					<>
						<div className="wib-col-1-2 customPos1" onClick={ () => setActiveIndex(3) } style={checkedItems.some(x => x.type === 'stand') ? {filter: 'unset', left: positions[0], top: '155px', transform: transforms[0]} : {left: positions[0], top:'155px', transform: transforms[0] }}>
						  <p style={activeIndex === 3 ? {color: '#d19e00'} : {}}>Stands</p>
						  <img src="/images/stand.png" />
						</div>

						{accessories.length !== 0 && 
							<div className="wib-col-1-2 customPos1" onClick={ () => setActiveIndex(4) } style={checkedItems.some(x => x.type === 'accessory') ? {filter: 'unset', left: positions[1], top: '155px', transform: transforms[1]} : {left: positions[1], top: topPositions[2] === '0%' ? '155px' : topPositions[2], transform: transforms[1] }}>
							  <p style={activeIndex === 4 ? {color: '#d19e00'} : {}}>Misscellaneous</p>
							  <img src="/images/accessories.jpg" />
							</div>
						}
					</>
				)
			}
	}

	function GenerateSummary(){
		return(
			<div className="cont-flex summary-tablet">
				<div className="summary">
					<div className="flex space-between">
						<h3 className="f22">Your system</h3>
					</div>

					<div className="mh-336">
						<div className="flex space-between">
							<h3 className="f18">{productDetails.ShortName_Formated}</h3>
							<p className="bold f16">$ {productDetails.Price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
						</div>

						{/*generateWarrantyForCheckoutList()}*/}

						{checkedItems.length !== 0 && checkedItems.map(x => (
							<div className="flex space-between" key={Math.random()}>
								<p className="f18">{x.quantity + 'x'} {x.name}</p>
								<p className="bold f16">{ "$" + (Number(x.price) * x.quantity)}</p>
							</div>
						))
						}
					</div>

					<div className="total">
						<div className="flex space-between">
							<h3>Total</h3>
							<p className="bold">$ {Number(totalPrice).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
						</div>
					</div>

{/*					<div className="monthly-payment">
						<div className="monthly-payment-cont-2">
							<h1 className="f48">${ (Number(totalPrice) / 36).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</h1>
						</div>
					</div>*/}

					<div className="btn-configure-container">
						{ !noHeader ? 
							<>
							<a className="start m0 white-text cg-btn" onClick={ () => setProceed(false)}>Back</a>
							<a onClick={() => addToCartWithAccessories()} className="start m0 white-text cg-btn">Add to cart</a>
							</> : <></>
						}
					</div>
				</div>
			</div>
		)
	}
	return(
		<React.Fragment>
			{!isMobile && 
				<div className="flex-gsc">
					<span className="no-action gs-nav" >1. Define your needs</span>
					<span className="no-action gs-nav" >2. Choose one copier</span>
					<span className="no-action gs-nav gs-active" >3. Customize your copier</span>
					<span className="no-action gs-nav" >4. Summarize</span>
				</div>
			}

			{isMobile && 
				<>
					<div className="flex-gsc w100 p0">
						{!noHeader &&
							<span className="no-action gs-nav gs-active w100" >3. Customize your copier</span>
						}

						{
							noHeader && 
							<span className="no-action gs-nav gs-active w100" >4. Summary</span>
						}
					</div>

					<div className="rectangle-mobile">
						<div>
							<i className="fas fa-chevron-circle-left f22" onClick={goBack}></i>
						</div>


						<div className="flex-inline">
							<img src={productDetails.url} height="80px" />
							<h3 className="f18">
								{productDetails.ShortName_Formated}
							</h3>
						</div>
					</div>

					<div className="mobile-price-container">
						<p>
							$ {Number(totalPrice).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} <br/> 
							<span className="light">Net price</span>
						</p>
					</div>
				</>
			}
			{!noHeader && 
				<div className="what-in-box-2 mb0">
					<h3>What should be in the box?</h3>

					<div className="switch">
						<label className={classN}>Essentials</label><PurpleSwitch checked={checked} onChange={handleCheckedChange} /><label className={class2}>Options</label>
					</div>

					<RenderWhatIsInTheBoxSection />

					<div className="img-cont custom-position-tablet" style={{left: positions[3] }}>
						<div className="wrapper">
							<div className="img"/>
							
							{!proceed &&<div className="configure-section">
								{!checked ? <GenerateEssentials /> : <GenerateOptions />}
								<div className="btn-configure-container">
									<a role="button" className="start m0 white-text cg-btn" style={!checked ? {background:'#d19e00'} : {}}onClick={() => setChecked(!checked)} >{!checked ? 'Options' : 'Essentials'}</a>
									<a role="button" className="start m0 white-text cg-btn" onClick={() => setProceed(true)}>Proceed</a>	
								</div>
							</div>
							}
							{
								proceed && <GenerateSummary />
							}
						</div>
					</div>
					}

				</div>
			}

{/*			<div className="productSelected">
				<div>
					<a onClick={goBack} href="/"><i className="fas fa-chevron-circle-left"></i></a><img src={images.length > 1 ? images[images.length - 2] : images[0]}/>
					<h3>{productDetails.ShortName_Formated} <br/> <a href={`/item/${id}`} target="_blank">Details</a> </h3>
				</div>
				<div>
					<h3>$ {Number(totalPrice).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} <br/> <span>Net price</span> </h3>
					<h3>$ {(Number(totalPrice) / 36).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} <span>/monthly</span> <br/> <span>Per month for 36 months lease</span></h3>
				</div>
			</div>*/}

			<div style={{height:'15px'}}></div>

{/*			<GenerateSummary />*/}
		</React.Fragment>
	)
}