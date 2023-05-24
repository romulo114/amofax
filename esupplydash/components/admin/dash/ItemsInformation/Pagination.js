import { Box } from "@material-ui/core"

const styles = {
    Box:{
        display:'flex',
        gap:'6px',
        background:'white',
        position:'absolute',
        left:'50%',
        transform:'translateX(-50%)',
    }
}
export default function Pagination(){

    let pages = 10;

    const RenderPages = () => {

        let elements = [];
        for(let i = 1; i <= pages; i++){
            elements.push(
                <Box key={i} className="pagination">{i}</Box>
            )
        }

        return elements
    }
    return(
        <Box style={styles.Box} className="pagination-container">
            <RenderPages />
        </Box>
    )
}