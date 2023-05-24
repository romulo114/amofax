import React, { useState, useEffect} from "react";

export default function Footer(){
	return(
		<footer>
			<div className="first-col">
				<img src="/images/logo-white.png" width="75.67%" />
				<p>Email: sales@amofax.com</p>
				<p>Phone: 1 - 973 - 482 - 3700</p>
				<p>105 Harrison Avenue, <br/>Harrison, New Jersey, 07029</p>
			</div>

			<div className="second-col">
{/*				<a href="#">My Account</a>*/}
				<a href="/my-wishlist">My Wishlist</a>
				<a href="/privacy-policy">Privacy Policy</a>
				<a href="/billing-terms-and-conditions">Billing Terms and Conditions</a>
				<a href="/refunds-and-exchange">Refund and Exchange Policy</a>
{/*				<a href="#">Customer Service</a>*/}
			</div>

			<div className="third-col">
				<a href="#"><i className="fas fa-undo"></i>&nbsp; Easy return in case of damage</a>
				<a href="#"><i className="fas fa-lock"></i>&nbsp; Safe payment</a>
			</div>

			<div className="fourth-col">
				<div className="payment_methods"> 
					<img src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg" alt="American express"/> 
					<img src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/discover-cc9808e50193c7496e7a5245eb86d5e06f02e2476c0fe70f2c40016707d35461.svg" alt="Discover"/> 
					<img src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg" alt="Master"/> 
					<img src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg" alt="Visa"/>
				</div>
			</div>


			<div className="copyright">
				<span>Amofax © 2021. All Rights Reserved</span>
			</div>
		</footer>
	)
}