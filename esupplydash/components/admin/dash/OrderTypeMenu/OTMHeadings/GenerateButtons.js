import { useContext, UseContext, useEffect } from "react";
import Button from "../../DashHeader/DashHeaderButtonMenu/Button";
import { DashContext } from "../../DashContext";
import GradientBox from "../../../../GradientContainer";

export default function GenerateButtons(){
    let { dash, setDash } = useContext(DashContext);

    useEffect( () => {
        let buttons = []

        buttons.push({name:'ESB'})
        buttons.push({name:'PCM'})
        buttons.push({name:'G MPN'})
        buttons.push({name:'G NAME'})
        buttons.push({name:'A MPN'})
        buttons.push({name:'A NAME'})
        buttons.push({name:'EBAY MPN'})
        buttons.push({name:'EBAY NAME'})
        
        console.log(dash)

        if(dash.headingList.length !== 0) return;

        setDash({
            name: 'addHeadings',
            payload: buttons
        })
    }, [])

    useEffect( () => {

    }, [dash])

    function onButtonClick(index){
        setDash({
            name:'setActiveHeading',
            payload:index
        })
    }
    return (
        dash.headingList.map((x,i) => (
                <GradientBox key={i}>
                    <Button key={i} className={
                        "ap-otmh-button " +
                        (i === dash.activeButton ? '' : '') + 
                        ' ' + (x.className ? x.className : '') 
                    } onClick={
                        () => onButtonClick(i)
                    }>{x.name}</Button>
                </GradientBox>
            )   
        )
    )
}