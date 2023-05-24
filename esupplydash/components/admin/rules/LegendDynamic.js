import { Box } from "@material-ui/core";

const styles = {
    ignoreLegend: { background: 'rgba(255,0,0,0.35)', width: '10px', height:'10px', marginRight:'5px' },
    container: { position: 'relative', fontSize:'14px', paddingLeft:'5px', marginBottom: '2px'},
    ruleContainer: { display: 'flex', alignItems:'center' }, 
    header: { marginBottom:'3px'}
}
export default function Legend({background, label}){
    return(
        <>
        <Box style={styles.container}>
            
            <Box style={styles.ruleContainer}>
                <Box style={{...styles.ignoreLegend, background: background}}></Box><span>{label}</span> 
            </Box>
        </Box>
        </>
    )
}