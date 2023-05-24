import { Box, Divider, Button } from "@material-ui/core";
import { RulesContext } from "./RulesContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import convertPrices from "../../../helpers/convertPrices";

const styles = {
    header: {marginBottom: '15px',marginTop:'15px', textAlign:'center'},
    container: { width: '30%'},
    center: { textAlign:'center', position:'absolute'},
    inputContainer: { display: 'flex', flexDirection: 'row', marginBottom:'15px', alignItems:'center', marginTop:'15px', justifyContent:'center'},
    active: { width:'100px', height:'40px', marginBottom:'5px', marginTop:'5px', marginLeft:'5px', padding:'5px', color: 'white', background: 'green'},
	button2:{ width:'100px', height:'40px', marginBottom:'5px', marginTop:'5px', marginLeft:'5px', padding:'5px' }
}

export default function Margins(){

    const { rules, dispatch, enhancedDispatcher } = useContext(RulesContext)

    const [ addNew, setAddNew ] = useState(false)

    const [ minimumPrice, setMinPrice ] = useState('')
    const [ maximumPrice, setMaxPrice ] = useState('')
    const [ minimumCut, setMinCut ] = useState('')
    const [ maximumCut, setMaxCut ] = useState('')

    let { margins } = rules;

    useEffect( () => {
        enhancedDispatcher({name:'GET_MARGINS'})
        console.log(rules)
    }, [])

    function addRule(){
        if(addNew) {
            if(!Number.isInteger(Number(minimumPrice)) || !Number.isInteger(Number(maximumPrice)) 
            || !Number.isInteger(Number(minimumCut)) || !Number.isInteger(Number(maximumCut)) ){
                alert('Please enter numbers.')
                return;
            }


            if(Number(minimumPrice) >= Number(maximumPrice) || Number(minimumCut) >= Number(maximumCut)){
                alert('Maximal values have to be greater than minimal values.')
                return;
            }

            axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/set_margins', {
                minimumPrice,
                maximumPrice,
                minimumCut,
                maximumCut
            }).then( res => {
                setAddNew(false)
                enhancedDispatcher({name: 'GET_MARGINS'})
            })
            .catch( err => alert('An unexpected error occured, rule was not inserted.'))
        }

        setAddNew(true);
    }

    return(
        <Box style={styles.container} className="margin-container">
            <h4 style={styles.header}>Beat by range <i class="fa-solid fa-circle-question" title="The amount with which we will be beating other shops, expressed in percentage."></i></h4>
            <Divider />

            {margins.length === 0 && <>
                <div style={styles.header}>No rules set.</div>
            </>}

            {margins.length !== 0 && <>
                <Box className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Price Range</th>
                                <th>Margin range</th>
                                <th>Remove rule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rules.margins.map(x => {
                                return(
                                    <tr>
                                        <td>{x.id}</td>
                                        <td>{x.Minimum} $ - {x.Maximum} $</td>
                                        <td>{x.CutMinimum} $ - {x.CutMaximum} $</td>
                                        <td>
                                            <i title="Remove the rule" className="fa fa-times" onClick={ async () => {
                                                await axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/delete_margin', {id: x.id})
                                                enhancedDispatcher({name: 'GET_MARGINS'})
                                            }}></i>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Box>
            </>}

            {addNew && 
            <div style={styles.inputContainer} className="input-container">
                <div>
                    <span>From range between: </span>
                </div>
                <div>
                    <input placeholder="PriceMin" type="text" value={minimumPrice} onChange={ e => setMinPrice(e.target.value)} />
                    -   
                    <input placeholder="PriceMax" type="text" value={maximumPrice} onChange={ e => setMaxPrice(e.target.value)} />
                    
                </div>
                <div>
                    <span>
                        beat by:
                        <input placeholder="CutMin" type="text" value={minimumCut} onChange={ e => setMinCut(e.target.value)}/>
                        -
                        <input placeholder="CutMax" type="text" value={maximumCut} onChange={ e => setMaxCut(e.target.value)}/>
                    </span>
                </div>
            </div>}

            <div style={styles.center}>
                <Button variant="contained" onClick={addRule} style={addNew ? styles.active : styles.button2}>
                    <span>{/*<i className="fa fa-plus"></i>*/}{addNew ? 'Save' : 'Add rule'}</span>
                </Button>  
                {addNew && <Button variant="contained" style={styles.button2} onClick={() => setAddNew(false)}>
                    <span>Cancel</span>    
                </Button> }                  
            </div>

        </Box>
    )
}