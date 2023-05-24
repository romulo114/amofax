import orderRangeInFours from "../helpers/orderRangeInFours.js";
import React from "react";

export default function RenderPrintingSpeedColor({results, cpsLength}){
	let printingSpeed = {}

	let printingSpeedArray = [];

	results.map(x => {
		let pS = x['Color Printing Speed']

		if(pS === 0) return;

		if(!printingSpeed[pS]){
			printingSpeed[pS] = true;
			++cpsLength.current
			printingSpeedArray.push(pS)
		}
	})

	let values = orderRangeInFours(printingSpeedArray);

	return(
		values.map((x,i) => {
				return(
					<div key={i} className="brandName-container">
						<label>
							<span>{x.min} - {x.max}</span>
							<input type="checkbox" onChange={(e) => setFilter(e,i, 'cps', x)} checked={ filters['cps'][i] } />
						</label>
					</div>
				)
		})
	)
}