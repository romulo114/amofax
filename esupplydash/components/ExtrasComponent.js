import React, { useState, useEffect, useRef } from "react";
import Quantity from "./Quantity";
import useLocalStorage from "./useLocalStorage";

export default function Extras({name, items, accordionClick, isOpen,id, noHeader, className, cartItems, addItemsToCart, setCartOpen, checkedItems, setCheckedItems  }){

  	let [ quantity, setQuantity ] = useState(0)

    function parentEffect(item, quantity){
    	let index = checkedItems.findIndex(x => x.name === item.name && x.id === item.id);

    	if(index !== -1){
    		checkedItems[index] = { ...checkedItems[index], quantity: quantity }
    	}else{
    		checkedItems.push({...item, quantity})
    	}

    	if(quantity === 0 && index !== -1){
    		checkedItems = checkedItems.filter( x => x !== item.name && x.id !== item.id);
    	}

    	setCheckedItems([...checkedItems])
    }

    useEffect( () => {

    }, [checkedItems])
	return(
		<div className="extras">
			<div className={noHeader ? "extras-top green " + className  : "extras-top " + className } onClick={accordionClick}>
				<h3>{name}</h3>
				{isOpen ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
			</div>

			{ isOpen ? 
			<div className="extras-bottom">
				{items.map( (x,i) => {
					return(
						<div className="item" key={x.id}>
							<div className="item-wrapper">
                			<img src={x.url} className={x.type + '-img'}/>
								<p>{x.name} <br/> <span>+ ${x.price}</span></p>
                				<Quantity 
                					quantity={quantity} 
                					className="configure-quantity" 
                					item={x} 
                					cartItems={cartItems} 
                					addItemsToCart={addItemsToCart} 
                					effect={parentEffect}
                				/>
							</div>

						</div>
					)
				})}
			</div> : ""}
		</div>
	)
}