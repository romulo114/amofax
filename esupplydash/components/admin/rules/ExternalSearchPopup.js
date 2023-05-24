import { useContext } from "react";
import { RulesContext } from "./RulesContext";
import { Button } from "@material-ui/core";

const styles = {
	button2:{
		width:'150px',
		height:'40px',
		marginBottom:'5px',
		marginTop:'5px',
		marginLeft:'5px',
		padding:'5px'
	}
}
export default function ExternalSearchPopup(){
    let { rules, dispatch } = useContext(RulesContext);

    function getCurrentItem(){
        return rules.printersData[rules.active]
    }

    function getSearchQueryForName(item){
        let arr = item.ShortName.split(" - ")[0].split(" ");
        let model = arr[arr.length - 1];
        let brand = arr[0];
      
        arr.map(x => {
          if(x.includes('HL-')) model = x;
        })
      
        let term = brand + " " + model;
      
        if(model === 'All-in-One' || 
        model === 'All-In-One' ||
        model === 'PostScript' || 
        model === 'MFP' || 
        model === 'direct' || 
        model.toLowerCase() === 'printer' ||
        model.toLowerCase() === 'pack' ||
        model.toLowerCase().includes('tank') ){
          term = partNumber;
        }

        return term;
    }

    function getSearchQueryForMPN(item){


        let arr = item.ShortName.split(" - ")[0].split(" ");
        let term = arr[0] + " " + item.mpn;

        return term;

    }

    function onGoogleSearchByName(){

        if(rules.active === -1) return;
        
        let item = getCurrentItem()
        let searchStr = getSearchQueryForName(item)

        window.open("https://shopping.google.com/search?tbm=shop&hl=en-US&q=" + searchStr, "_blank")
    }

    function onGoogleSearchByMPN(){

        if(rules.active === -1) return;
        
        let item = getCurrentItem()
        let searchStr = getSearchQueryForMPN(item)

        window.open("https://shopping.google.com/search?tbm=shop&hl=en-US&q=" + searchStr, "_blank")
    }

    function onAmazonSearchByName(){

        if(rules.active === -1) return;
        
        let item = getCurrentItem()
        let searchStr = getSearchQueryForName(item)

        window.open("https://amazon.com/s?k=" + searchStr, "_blank")
    }

    function onAmazonSearchByMPN(){

        if(rules.active === -1) return;
        
        let item = getCurrentItem()
        let searchStr = getSearchQueryForMPN(item)

        window.open("https://amazon.com/s?k=" + searchStr, "_blank")
    }

    function onEbaySearchByName(){

        if(rules.active === -1) return;
        
        let item = getCurrentItem()
        let searchStr = getSearchQueryForName(item)

        window.open("https://www.ebay.com/sch/i.html?_from=R40&rt=nc&LH_BIN=1&_nkw=" + searchStr, "_blank")
    }

    function onEbaySearchByMPN(){

        if(rules.active === -1) return;
        
        let item = getCurrentItem()
        let searchStr = getSearchQueryForMPN(item)

        window.open("https://www.ebay.com/sch/i.html?_from=R40&rt=nc&LH_BIN=1&_nkw=" + searchStr, "_blank")
    }

    return(
        <div className="popup" style={{zIndex:'9'}}>
            <Button variant="contained" style={styles.button2} onClick={onGoogleSearchByMPN}>Google by MPN</Button>
            <Button variant="contained" style={styles.button2} onClick={onGoogleSearchByName}>Google by Name</Button>
            <Button variant="contained" style={styles.button2} onClick={onAmazonSearchByMPN}>Amazon by MPN</Button>
            <Button variant="contained" style={styles.button2} onClick={onAmazonSearchByName}>Amazon by Name</Button>
            <Button variant="contained" style={styles.button2} onclick={onEbaySearchByMPN}>Ebay by MPN</Button>
            <Button variant="contained" style={styles.button2} onClick={onEbaySearchByName}>Ebay by Name</Button>
        </div>
    )
}