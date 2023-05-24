import { useContext, UseContext, useEffect } from "react";
import Button from "../../DashHeader/DashHeaderButtonMenu/Button";
import { DashContext } from "../../DashContext";
import GradientBox from "../../../../GradientContainer";

export default function GenerateButtons2x3(){
    let { dash, setDash } = useContext(DashContext);

    useEffect( () => {
        let buttons = []

        buttons.push({name:'Green Lines'})
        buttons.push({name:'Opportunity'})
        buttons.push({name:'Match'})
        buttons.push({name:'DRSC'})
        buttons.push({name:''})
        buttons.push({name:''})
        

        if(dash.headingList.length !== 0) return;

        setDash({
            name: 'addHeadings2x3',
            payload: [...buttons]
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
        dash.headingList2x3.map((x,i) => (
                <GradientBox key={i} padding='0px' gridArea={'button'+i}>
                    <Button key={i} className={
                        "ap-otmh-button2x3 " +
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