import { useContext, UseContext, useEffect } from "react";
import Button from "./Button";
import { DashContext } from "../../DashContext";

export default function GenerateButtons(){
    let { dash, setDash } = useContext(DashContext);

    useEffect( () => {
        let buttons = []

        buttons.push({name:'Charge'})
        buttons.push({name:'PFS'})
        buttons.push({name: 'Purchase'})
        buttons.push({name: 'WW'})
        buttons.push({name:'UPG'})
        buttons.push({name:'Price Issues', className:'price-issues'})
        buttons.push({name:'Problems', className:'problems'})
        buttons.push({name:'Exp. Soon', className: 'exp-soon'})
        buttons.push({name:'Expired', className: 'expired'})
        buttons.push({name:'WHS. Pending', className: 'lfs'})
        buttons.push({name:'Ebay Pending'})
        buttons.push({name:'PO Pending'})
        
        if(dash.buttonList.length !== 0) return;

        setDash({
            name: 'addButtons',
            payload: buttons
        })
    }, [])

    useEffect( () => {

    }, [dash])

    function onButtonClick(index){
        setDash({
            name:'setActive',
            payload:index
        })
    }
    return (
        dash.buttonList.map((x,i) => <Button key={i} className={
            "ap-dhbm-button " +
            (i === dash.activeButton ? 'ap-dhbm-active' : '') + 
            ' ' + (x.className ? x.className : '') 
        } onClick={
            () => onButtonClick(i)
        }>{x.name}</Button>)
    )
}