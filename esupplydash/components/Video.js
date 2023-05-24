import React, { useEffect, useState } from "react";

export default function Video(){

	return(
		<React.Fragment>

			<div className="video">
				<div className="video-cont">
					<h1>WE CAN HELP YOU FIND</h1>
					<h1>A PERFECT COPIER!</h1>
				</div>

{/*				<div className="action">
					<a href="#" className="wv">Watch video</a>
				</div>*/}
			</div>

			<div className="call_to_action">
				<span>The first step in finding a digital commercial copier that will suit your business needs is to figure out what exactly you need it to do and how much use it will be getting. With so many options out there, it can be challenging to know which copier is the right fit for your business.</span>

				<a href="/getting-started" className="no-act start">Let's start ></a>
			</div>

		</React.Fragment>
	)
}