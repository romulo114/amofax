import { RulesContext } from "./RulesContext"
import { useContext, useEffect } from "react"
import { Divider } from "@material-ui/core"

export default function ProgressComponent(){    
    let { rules, dispatch, enhancedDispatcher } = useContext(RulesContext);


    useEffect( () => {
        console.log(rules.pricesGlobalConfigurationCurrentState)
    }, [rules.pricesGlobalConfigurationCurrentState])
    return(
        <div className="popup popup-progress">
            <div className="progress-wrapper">
                <h4 style={{textAlign: 'center'}}>
                    Printers global configuration wizard
                </h4>

                <p style={{textAlign:'center'}}>
                    {rules.pricesGlobalConfigurationActiveIndex}/{rules.printersData.length}   
                </p>

                <Divider />
                <div className="progress-bar">
                    <div className="progress-bar-inner" style={{width: rules.progressBarWidth + "%"}}></div>
                </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Link</th>
							<th>Name</th>
							<th>Old Price</th>
                            <th>New price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.printersData.map((x,i) => (
                            <tr key={i} className={rules.pricesGlobalConfigurationActiveIndex === i ? 'active-admin' : ''}>
                                <td className="small">{x.Matnr}</td>
                                <td title={x.ShortName}>{x.ShortName.split(" - ")[0].substr(0,30)}</td>
                                <td className="small" style={{color:'red', fontWeight:'bold'}}>$ {Math.floor(x.Price)}</td>
                                <td className="small">
                                    { rules.pricesGlobalConfigurationCurrentState[i] ? 
                                        rules.pricesGlobalConfigurationCurrentState[i].error ? 
                                        <span title={rules.pricesGlobalConfigurationCurrentState[i].error}>ERROR</span> : <span className="bold">$ {rules.pricesGlobalConfigurationCurrentState[i].newPrice}</span> : 
                                        ''
                                    }    
                                </td>
                            </tr>
                        ))}    
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}