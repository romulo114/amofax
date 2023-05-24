import { 
    Input,
    OutlinedInput,
    InputAdornment,
    Box
} from "@material-ui/core";

const styles = {
    Container: {
        display:'inline-flex',
        gap: '10px',
        justifyContent:'space-around',
        alignItems: 'center'
    },
    Icon: {
        fontSize: '34px !important'
    },
    IconRefresh:{
        fontSize: '24px !important',
        marginLeft:'15px',
        marginRight:'15px'
    }
}

export default function DashHeaderPagination(){
    return (
        <div style={styles.Container}>
            <OutlinedInput variant="filled" size="small" className="ap-dhp-input pr-0" endAdornment={
                <InputAdornment position="start">
                    Items
                </InputAdornment>
            } />

            <Box style={{display:'flex', alignItems:'center', gap:'6px'}}>

                <i className="fa-solid fa-angle-left" style={styles.Icon}></i>
                <OutlinedInput variant="filled" size="small" className="ap-dhp-input pr-0" startAdornment={
                    <InputAdornment position="start">
                        Page
                    </InputAdornment>
                } />
                <OutlinedInput variant="filled" size="small" className="ap-dhp-input pr-0" startAdornment={
                    <InputAdornment position="start">
                        of
                    </InputAdornment>
                 } />
                <i className="fa-solid fa-angle-right" style={styles.Icon}></i>
                <i className="fa-solid fa-arrow-rotate-left" style={styles.IconRefresh}></i>
            </Box>
        </div>
    )
}