import { 
    Input,
    OutlinedInput,
    InputAdornment,
    Box,
    Select,
    MenuItem
} from "@material-ui/core";

const styles = {
    Container: {
        display:'inline-flex',
        gap: '10px',
        justifyContent:'space-around',
        alignItems: 'center',
        width:'100%'
    },
    Icon: {
        fontSize: '34px !important'
    },
    IconRefresh:{
        fontSize: '24px !important',
        marginLeft:'15px'
    },
    IconSearch:{
        fontSize: '18px !important'
    }
}

export default function Component(){
    return (
        <Box style={styles.Container}>
            <OutlinedInput variant="filled" size="small" className="ap-dhp-search pr-0 w100" endAdornment={
                <InputAdornment position="end">
                    <Select className="ap-dhs-custom" defaultValue="PO" sx={{border:0}}>
                        <MenuItem value={'PO'}>PO</MenuItem>
                        <MenuItem value={'Name'}>Name</MenuItem>
                        <MenuItem value={'Date'}>Date</MenuItem>
                        <MenuItem value={'Price'}>Price</MenuItem>
                    </Select>
                </InputAdornment>
            } 
            startAdornment={
                <InputAdornment position="start">
                    <i className="fa-solid fa-magnifying-glass" style={styles.IconSearch}></i>
                </InputAdornment>
            }
            />
        </Box>
    )
}