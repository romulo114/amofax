import { useContext, useEffect, useState } from "react";
import { Divider, Button, Box } from "@material-ui/core";
import { RulesContext } from "./RulesContext";
import Legend from "./LegendDynamic";

const styles = {
    container: {
        marginLeft:'35px'
    },
    AmazonCSSFix: {
        position:'relative',
        top:'5px'
    },
	button2:{
		width:'50px',
		height:'40px',
		marginBottom:'5px',
		marginTop:'5px',
		marginLeft:'5px',
		padding:'5px'
	}
}
export default function InventoryView({item}){

    let [ Amazon, setAmazon ] = useState([])
    let [ Ebay, setEbay ] = useState([])
    let [ Techdata, setTechdata ] = useState([])
    let [ sources, setSources ] = useState([])

    let { rules, dispatch, enhancedDispatcher } = useContext(RulesContext)


    function extractMarginRuleText(price){

        if(rules.profitMargins.length === 0) return "Not set."

        for(const margin of rules.profitMargins){
            let { PriceMinimum, PriceMaximum, Profit } = margin;
            
            if(price > PriceMinimum && price <= PriceMaximum){
                return "$" + Profit 
            }
        }

        return "Not set."
    }

    function extractMarginRuleNumber(price){
        if(rules.profitMargins.length === 0) return 0;

        for(const margin of rules.profitMargins){
            let { PriceMinimum, PriceMaximum, Profit } = margin;
            
            if(price > PriceMinimum && price <= PriceMaximum){
                return Number(Profit); 
            }
        }

        return 0;
    }



    function generateInventoryRecordColorBasedOnItemState(state, isActive){
        if(isActive) return '';


        if(!state) {
            console.log('state undefined')
            return ''
        }

        state = state.toLowerCase();

        if( state === 'new' || state === 'brand new' || state.includes('open box') || state.includes('open-box')) return 'inventory-legend-new'

        return 'inventory-legend-refurbished'
    }

    useEffect( () => {
        console.log(rules.inventory)
    }, [rules.inventory])


    if(rules.inventory.length === 0){
        return (
            <div style={styles.container} className="sources-container">

            <h4 style={{textAlign: 'center'}}>
                Sources
            </h4>
            <Divider />
            <p>No sources found for the item.</p>
            </div>
        )
    }else{
        return(
            <div style={styles.container} className="sources-container">
    
            <h4 style={{textAlign: 'center'}}>
                Sources
            </h4>
            <Divider />

			<Button 
				variant="contained" 
				style={styles.button2} 
                title="Remove item from the inventory"
				onClick={async () => {

                    if(rules.activeInventory === -1 || !rules.inventory[rules.activeInventory]){
                        alert('Please select the source you would like to remove from the inventory.')
                        return false
                    }
                    let matnr = rules.printersData[rules.active].Matnr
                    let url = rules.inventory[rules.activeInventory].url || rules.inventory[rules.activeInventory].link;

                    await rules.methods.onInventoryRemove(url, matnr)                    
                    enhancedDispatcher({ name:'GET_INVENTORY', payload: matnr })
                }}> 
                <i className="fa fa-times"></i>
			</Button>


            <Button className="higherOrder" title="Profit margins" variant="contained" style={styles.button2} onClick={() => {
                dispatch({name: 'SHOW_PROFIT_MARGINS'})
            }}>
                <i className="fas fa-percent"></i>
            </Button>

            <Divider />

            <Box className="inventory-legend-container">
                <Legend background='rgba(0,255,0,0.35)' label="New" />
                <Legend background='rgba(255,215,0,.35)' label="Refurbished" />
            </Box>
            <div className="table-wrapper">
                    {rules.inventory.length !== 0 && 
                    <table>
                        <thead>
                        <tr>
                            <th className="small">External link</th>
                            <th className="small">Net</th>
                            <th className="small">Price</th>
                            <th className="small">Tax</th>
                            <th className="small">CC Fee</th>
                            <th className="small">Margin</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rules.inventory.map((x,i) => { console.log(x); return <tr key={i} onClick={() => {
                                dispatch({name: 'SET_ACTIVE_INVENTORY', payload: i})    
                            }} className={ (rules.activeInventory === i ? 'active-admin' : '') 
                                + (generateInventoryRecordColorBasedOnItemState(x.state, rules.activeInventory === i))
                                }> 
                                <td className="small"><a href={x.url || x.link} target="_blank">
                                    {x.source === 'Amazon' && <img src="/images/Amazon.svg" />}
                                    {x.source === 'Ebay' && <img src="/images/Ebay.svg" />}    
                                    {x.source === 'Techdata' && <img src="/images/techdata.png" />}
                                </a></td>
                                <td className="small price-admin">
                                    ${Math.ceil((x.price * 1.07) * 1.045 + extractMarginRuleNumber(x.price * 1.07))}
                                </td>
                                <td className="small price-admin">${Math.floor(x.price)}</td>
                                <td className="small price-admin">${Math.ceil((x.price * 0.07))}</td>
                                <td className="small price-admin">${Math.ceil((x.price + x.price * 0.07) * 0.045)}</td>
                                <td className="small price-admin">{extractMarginRuleText(x.price * 1.07)}</td>
                            </tr>})}
                        </tbody>
                    </table>
                    }
                </div>
    
    
                
                
                {/*https://shop.techdata.com/products/14156533/?P=14156533&isValuePartOnly=False*/}
            </div>
        )
    }
}