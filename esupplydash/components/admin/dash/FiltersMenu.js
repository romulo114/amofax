import React from "react";
import Information from "./FiltersMenu/Information";
import { Box } from "@material-ui/core"
import Note from "./FiltersMenu/Note";

const styles = {
    Box:{
        marginTop:'20px',
        flexGrow:'1'
    },
    Container:{
        display:'flex',
        gap:'8px',
        width:'58%'
    },
    Box2:{
        marginTop: '4px',
        flexGrow: '3'
    },
    Box3:{
        marginTop:'20px',
        flexGrow: '2'
    },
    Box4:{
        width:'100%',
        display:'flex',
    },
    Box5:{
        marginTop:'-2px',
        flexGrow:'1',
        padding:'8px',
        position:'relative'
    }
}
export default function FiltersMenu(){
    return (
        <Box style={styles.Box4}>
            <Box style={styles.Container} className="filters-menu-container">
                <Box style={styles.Box}>
                    <Information columns={
                        [
                            {key: 'Order #', value: 'ESB-403'},
                            {key: 'Order Date', value: 'Dec-31-21'}
                        ]
                    }/>
                </Box>
                <Box style={styles.Box3}>
                    <Information columns={
                        [
                            {key: 'Name', value: 'Daniel Gutman'},
                            {key: 'Email:', value: 'mail@gmail.com'},
                            {key:'Telephone/Cellphone:', value: '949-336-659 / 949-336-6459'},
                            {key: 'Address:', value:'24142 Rome Dr.'},
                            {key: 'City/State/Zip:', value:'Mission Vijo, CA, 92691'}
                        ]
                    }/>
                </Box>
                <Box style={styles.Box}>
                    <Information columns={
                        [
                            {key: 'Total Sell Price', value: '$3,092.22'},
                            {key: 'S&H', value: '$52.99'},
                            {key: 'Order Total', value: '$3,145.27'},
                            {key: 'Profit', value: '$52.97'}
                        ]
                    }/>
                </Box>
                <Box style={styles.Box}>
                    <Information columns={
                        [
                            {key: 'radio', value:'UPG'},
                            {key:'radio', value: 'WW'},
                            {key:'radio', value:'PURCHASE'},
                            {key:'radio', value:'Price Issue'},
                            {key:'radio', value:'Problems'}
                        ]
                    }/>
                </Box>
            </Box>
            <Box style={styles.Box5}>
                    <Note />
                    <Information columns={
                        [
                            {key: 'radio', value:'UPG'},
                            {key:'radio', value: 'WW'},
                            {key:'radio', value:'PURCHASE'},
                            {key:'radio', value:'Price Issue'},
                            {key:'radio', value:'Problems'}
                        ]
                    }/>
            </Box>
        </Box>
    )
}