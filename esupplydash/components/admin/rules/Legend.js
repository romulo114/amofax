import { Box, Divider } from "@material-ui/core";

const styles = {
    ignoreLegend: { background: 'rgba(255,0,0,0.35)', width: '10px', height:'10px', marginRight:'5px' },
    container: { position: 'absolute', right:'35px', top:'15px', fontSize:'14px'},
    ruleContainer: { display: 'flex', alignItems:'center', width:'120px' }, 
    header: { marginBottom:'3px'}
}
export default function Legend(){
    return(
        <Box style={styles.container}>
            <h4 style={styles.header}>Rules applied</h4>
            <Divider />
            <Box style={styles.ruleContainer}>
                <Box style={styles.ignoreLegend}></Box><span>Ignored shops</span>                
            </Box>
        </Box>
    )
}