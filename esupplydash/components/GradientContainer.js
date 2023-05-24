import { Box } from "@material-ui/core";

const styles = {
    Box: function(left,right){
        return `linear-gradient(to right, ${left}, ${right})`
    }
}
export default function GradientBox({children, padding, gridArea}){
    return(
        <Box style={{background: styles.Box('#24AAE1', 'white'), padding: padding || '3px', borderRadius:'7px', gridArea: gridArea}}>
            {children}
        </Box>
    )
}

