import React, { useState, useEffect, useRef } from "react";
import useLocalStorage from "./useLocalStorage"
import axios from "axios";

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
}


export default function GraphComponent(){

	const [ results, setResults ] = useLocalStorage("results_filtered")
	const [ showGraph, setShowGraph ] = useLocalStorage("showGraph", false)
	const [ reduced, setReduced ] = useState([])

	let myChart = useRef(null)

	useEffect( () => {
		axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/get_cpp", {results: results}).then( res => {

			let data = res.data; 

			let __results = results; 

			__results.forEach( (x,i,arr) => {

				if(!data[x.Matnr]) return 

				let length = data[x.Matnr].length; 

				__results[i] = {...x, 'Cost Per Color Page': data[x.Matnr][length - 1].cpc || 'Unknown', 'Cost Per Black Page': data[x.Matnr][length - 1].cpb || 'Unknown'}
			})

			__results.sort( (a,b) => {
				let res2 = a['Cost Per Color Page'] 

				if(typeof res2 === 'number') return -1 
				else return 1 
			})
			setResults([ ...__results])
		} )
	}, [])
	useEffect( () => {
		let _reduced = results.reduce( (reducer,x) => {
			if(x['Cost Per Color Page'] === 'Unknown') return reducer; 

			let obj = {}
			let data = (((20000 - (20000 * 0.28)) * x['Cost Per Black Page'] + ((20000 * 0.28)) * x['Cost Per Color Page'])) + x.Price
			let data1 = (((40000 - (40000 * 0.28)) * x['Cost Per Black Page'] + ((40000 * 0.28)) * x['Cost Per Color Page'])) + x.Price
			let data2 = (((60000 - (60000 * 0.28)) * x['Cost Per Black Page'] + ((60000 * 0.28)) * x['Cost Per Color Page'])) + x.Price
			let data3 = (((100000 - (100000 * 0.28)) * x['Cost Per Black Page'] + ((100000 * 0.28)) * x['Cost Per Color Page'])) + x.Price

			let color = random_rgba();
			obj['label'] = 'Total price for ' + x['Product Name'].split(" - ")[0];
			obj['data'] = [x.Price, data, data1, data2, data3]
			obj['backgroundColor'] = ['transparent']
			obj['borderColor'] = color
			obj['borderWidth'] = 2;
			obj['pointBackgroundColor'] = color
			obj['color'] = color

			reducer.push(obj)
			return reducer
		},[])

		setReduced([..._reduced])

	}, [results])

	useEffect( () => {
		if(window.Chart === undefined || reduced.length === 0) return 
		var ctx = document.getElementById('myChart');

		if(myChart.current){
			myChart.current.destroy()
		}
		let _reduced = results.reduce( (reducer,x) => {
			if(x['Cost Per Color Page'] === 'Unknown') return reducer; 

			let obj = {}
			let data = (((20000 - (20000 * 0.28)) * x['Cost Per Black Page'] + ((20000 * 0.28)) * x['Cost Per Color Page'])) + x.Price
			let data1 = (((40000 - (40000 * 0.28)) * x['Cost Per Black Page'] + ((40000 * 0.28)) * x['Cost Per Color Page'])) + x.Price
			let data2 = (((60000 - (60000 * 0.28)) * x['Cost Per Black Page'] + ((60000 * 0.28)) * x['Cost Per Color Page'])) + x.Price
			let data3 = (((100000 - (100000 * 0.28)) * x['Cost Per Black Page'] + ((100000 * 0.28)) * x['Cost Per Color Page'])) + x.Price

			let color = random_rgba();
			obj['label'] = 'Total price for ' + x['Product Name'].split(" - ")[0];
			obj['data'] = [x.Price, data, data1, data2, data3]
			obj['backgroundColor'] = color;
			obj['borderColor'] = color
			obj['borderWidth'] = 1;
			obj['pointBackgroundColor'] = color
			obj['color'] = color

			reducer.push(obj)
			return reducer
		},[])


		myChart.current = new window.Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: ['Purchase price', '20k prints', '40k prints', '60k prints', '100k prints'],
		        datasets: reduced
		    },
		    options: {
			    legend: {
			        display: false,
				},
		        legendCallback: function (chart) {             
		            // Return the HTML string here.
		            console.log(chart.data.datasets);
		            var text = [];
		            text.push('<ul class="' + chart.id + '-legend">');
		            for (var i = 0; i < chart.data.datasets.length; i++) {
		                text.push('<li><div class="legend-box" style="background-color:' + chart.data.datasets[i].borderColor + '"></div> <span style="color:' + chart.data.datasets[i].borderColor + '" id="legend-' + i + '-item">');
		                if (chart.data.datasets[i].label) {
		                	let label = chart.data.datasets[i].label.split("Total price for ");

		                    text.push(label[1]);
		                }
		                text.push('</span></li>');
		            }
		            text.push('</ul>');
		            return text.join("");
		        },
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true
		                }
		            }]
		        },
				layout: {
		            padding: {
		                left: 0,
		                right: 0,
		                top: 0,
		                bottom: 0
		            }
				},
				tooltips: {
				  enabled: true,
				  mode: 'single',
				  backgroundColor: 'green',
				  displayColors: true,
				  callbacks: {
		           label: function (tooltipItems, data, i) {
		           		let index = tooltipItems.datasetIndex;

		                return  data.datasets[index].label + ": " + tooltipItems.yLabel.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " $";
		           }
				  }
				}
		    }
		});

		document.getElementById('legend').innerHTML = myChart.current.generateLegend()

	}, [reduced])

	return(
		<div className="bg-gray">
			<div className="w70 p-top-7">
				<div className="graph-heading-container">
					<p className="graphComponent-p center">Total cost of ownership</p>
					<p className="graphComponent-p-next center">100.000 prints @ 5% coverage each color</p>
				</div>
				<div className="graphComponent-flex">
					<div className="graphComponent-chart-container">
						<div id='legend'></div>
						<canvas id="myChart" width="709" height="400"></canvas>
					</div>
				</div>
			</div>
		</div>
	)
}