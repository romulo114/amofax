import React from "react";
import Header from "./Header";

export default function HeaderWithProps(){
	return(
		<Header cartItems={cartItems} addItemsToCart={addItemsToCart} setCartOpen={setCartOpen} cartOpen={cartOpen} loading={loading} setLoading={setLoading}/>
	)
}