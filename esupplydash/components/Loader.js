import React, { useState, useEffect } from "react";

export default function Loader({loadingMessage, className}){
	useEffect( () => {
	
	})

	return(
		<div className={"loading-container " + className}>
			<h2>{loadingMessage !== '' ? loadingMessage : "Loading data, please be patient."}</h2>
			<div className="mosaic-loader">
			    <div className="cell d-0"></div>
			    <div className="cell d-1"></div>
			    <div className="cell d-2"></div>
			    <div className="cell d-3"></div>
			    <div className="cell d-1"></div>
			    <div className="cell d-2"></div>
			    <div className="cell d-3"></div>
			    <div className="cell d-4"></div>
			    <div className="cell d-2"></div>
			    <div className="cell d-3"></div>
			    <div className="cell d-4"></div>
			    <div className="cell d-5"></div>
			    <div className="cell d-3"></div>
			    <div className="cell d-4"></div>
			    <div className="cell d-5"></div>
			    <div className="cell d-6"></div>
			</div>
		</div>
	)
}