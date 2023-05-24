import DashHeaderPagination from "./DashHeaderActions/DashHeaderPagination";
import DashHeaderSearch from "./DashHeaderActions/DashHeaderSearch";

const styles = {
    headerInner: {
        display:'flex',
        flexDirection: 'row',
        paddingTop:'15px',
        paddingLeft:'25px'
    },
    h1:{
        marginTop:'0',
        marginBottom:'0',
        fontWeight:'normal'
    },
    container:{
        width:'50%',
        display:'flex'
    },
    container1:{
        width:'47%',
        display:'flex'
    }
}
export default function F(){
    return (
        <div style={styles.headerInner} className="ap-dha">
            <div style={styles.container1}>
                <h1 style={styles.h1}>ADMIN</h1>
            </div>
            <div style={styles.container}>
                <DashHeaderPagination />
                <DashHeaderSearch />
            </div>
        </div>
    )
}