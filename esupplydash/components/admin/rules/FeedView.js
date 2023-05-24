import { RulesContext } from "./RulesContext"
import { useContext, useEffect, useState, useRef } from "react"
import { Divider, Button, Box } from "@material-ui/core"
import Legend from "./LegendDynamic"
import axios from "axios"

const styles = {
	button:{
		width:'250px',
		height:'30px',
		marginBottom:'5px',
		marginTop:'5px'
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

export default function View({feed}){
    
    let { rules, dispatch, enhancedDispatcher } = useContext(RulesContext)

    let prevResponse = useRef('');

    let [ feedLocal, setFeedLocal ] = useState([])

    useEffect( () => {
        
        if(feed.length === 0) return;

        let _feedLocal = JSON.parse(feed[0].Inventory);

        _feedLocal.sort((a,b) => a.price - b.price)
        setFeedLocal([..._feedLocal])

    }, [feed])

    function checkIfShopIsBeatable(price, isIgnored){
        if(rules.inventory.length === 0 || isIgnored) return ''

        
        let inventoryNewItems = rules.inventory.filter(x => {
            if(!x.state) return true

            let lcsState = x.state.toLowerCase()

            return lcsState.includes('new') || lcsState.includes('open')
        })

        if(inventoryNewItems.length === 0) return '';

        if(inventoryNewItems[0].computed.net > price ) return 'cant-beat'
        else return 'beatable'
    }
    
    return(
        <div className="feed-container">

            <h4 style={{textAlign: 'center'}}>
                Google feed
            </h4>

            <Divider />

			<Button 
				variant="contained" 
				style={styles.button2}
                title={feedLocal[rules.activeFeed] && feedLocal[rules.activeFeed].ignored ? 'Do not ignore shop' : 'Ignore shop'}
				onClick={() => {
                    let shop = feedLocal[rules.activeFeed].shop 
                    let matnr = rules.printersData[rules.active].Matnr

                    rules.methods.onFeedRemove(shop,'', matnr)
                }}>
            {feedLocal[rules.activeFeed] && feedLocal[rules.activeFeed].ignored ? 
                <i className="fas fa-eye"></i> : 
                <i className="fas fa-eye-slash"></i> 
            }
			</Button>
            <Button title="Show ignored shops" className="higherOrder" variant="contained" style={styles.button2} onClick={() => {
                dispatch({name: 'SHOW_IGNORED_SHOPS'})
            }}>
                <i className="fas fa-ban"></i>
            </Button>

            <Button title="Show beat by margins" className="higherOrder" variant="contained" style={styles.button2} onClick={() => {
                dispatch({name: 'SHOW_MARGINS'})
            }}>
                <i className="fas fa-greater-than"></i>
            </Button>

            <Divider /> 
            <Box className="inventory-legend-container">
                <Legend background='rgba(255,0,0,0.2)' label="Ignored shop" />
                <Legend background='rgba(255,215,0, 0.28)' label="Unbeatable shop" />
            </Box>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Shop</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedLocal.map((x,i) => (
                            <tr key={i} className={ (rules.activeFeed === i ? 'active-admin ' : '') + 
                            ( (x.ignored && rules.activeFeed !== i) ? 'ignore-shop ' : '') + 
                            ( checkIfShopIsBeatable(x.price, x.ignored) ) } onClick={() => {
                                dispatch({name: 'SET_ACTIVE_FEED', payload: i})
                            }}>
                                <td>{x.shop}</td>
                                <td className="price-admin">$ {Math.floor(x.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            </div>

        </div>
    )
}