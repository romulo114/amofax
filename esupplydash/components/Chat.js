import React, { useState, useEffect } from "react";

export default function Chat(){
	useEffect( () => {
			var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
			(function(){
			var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
			s1.async=true;
			s1.src='https://embed.tawk.to/6108dd21649e0a0a5ccf3acc/1fc59vioj';
			s1.charset='UTF-8';
			s1.setAttribute('crossorigin','*');
			s0.parentNode.insertBefore(s1,s0);
			})();
	}, [])

	return(
		<></>
	)
}