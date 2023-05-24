import { Box, Button, Divider } from "@material-ui/core";
import Margins from "./Margins";
import ProfitMargins from "./ProfitMargins";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RulesContext } from "./RulesContext";

const styles = {
    header: { marginBottom: '15px', marginTop:'15px', textAlign:'center'},
    container: { display: 'flex', flexDirection: 'row'},
    ignoredShopsContainer: {background:'white'}
}

export default function Rules(){

    let [ ignoredShops, setIgnoredShops ] = useState([])
    let { rules, dispatch } = useContext(RulesContext)

    let { onFeedRemove } = rules.methods

    return(
        <Box style={styles.container} className="rules-container">

            <Box className="popup">
            {rules.showIgnoredShops &&
                    <Box style={styles.ignoredShopsContainer}>
                    <h4 style={styles.header}>Ignored shops</h4>
                    <Divider />
                    {rules.ignoredShops.length === 0 && <>
                        <div style={styles.header}>No shops being ignored.</div>
                    </>}
                    {rules.ignoredShops.length !== 0 &&
                        <Box className="table-wrapper"> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Shop</th>
                                        <th>Remove from blacklist</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rules.ignoredShops.map((x,i) => {
                                        return(
                                            <tr key={i}>
                                                <td className="log-modal-shop">{x.id}</td>
                                                <td className="log-modal-shop">{x.ShopName}</td>  
                                                <td className="log-modal-price">
                                                    <i title="Remove the shop from blacklist" className="fa fa-times" onClick={ async () => {
                                                        await onFeedRemove(x.ShopName)
                                                    }}></i>	
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Box>
                    }
                    </Box>
            }

            {rules.showMargins && 
                    <Margins />
            } 

            {rules.showProfitMargins && 
                <ProfitMargins />
            }               
            </Box>

        </Box>
    )
}