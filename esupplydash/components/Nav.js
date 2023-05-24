import React, { useEffect, useState } from "react";

export default function Nav({className, active}){

	return(
		<nav className={className}>
			<ul>
				<li className={active === 0 ? 'header-active' : ''}>
					<a href="/laser-printers">LASER PRINTERS</a>
				</li>
				<li className={active === 4 ? 'header-active' : ''}>
					<a href="/a3-printers">A3 PRINTERS</a>
				</li>
				<li className="coming-soon">
						<a href="/inkjet-printers">INK-JET PRINTERS</a>
				</li>
				<li className="coming-soon">
					<a href="/dot-matrix-printers">DOT-MATRIX PRINTERS</a>
				</li>
				<li className="coming-soon">
						<a href="/consumables">INK & TONER CARTRIDGES</a>
				</li>



				<li className="coming-soon">
					<a href="#">SCANNERS</a>
				</li>
			</ul>
		</nav>
	)
}