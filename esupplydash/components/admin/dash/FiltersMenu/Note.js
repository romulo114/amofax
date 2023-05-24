import { 
    Box, 
    Select, 
    MenuItem 
} from "@material-ui/core";

export default function Note(){
    
    return(
        <Box className="note">
            <Select defaultValue="NOTES" className="note-select">
                <MenuItem value="NOTES">NOTES</MenuItem>
                <MenuItem value="VER">VER</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Bookkeeping">Bookkeeping</MenuItem>
                <MenuItem value="System">System</MenuItem>
            </Select>
        </Box>
    )
}