import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Checkbox,
    Radio
} from "@material-ui/core";

const styles = {
    TableContainer: {
        width:'100%',
        padding: '5px'
    }
}
export default function Component(){

    let data = [
        {Vendor: 'Lorem ipsum',Brand: 'Canon', S: '123132', PFR: 'Yes', QT: 2, Price: 573.53},
        {Vendor: 'Lorem ipsum',Brand: 'Canon', S: '123132', PFR: 'Yes', QT: 2, Price: 573.53},
        {Vendor: 'Lorem ipsum',Brand: 'Canon', S: '123132', PFR: 'Yes', QT: 2, Price: 573.53},
    ]
    return (
    <div style={styles.TableContainer}>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow className="table-header-row">
                        <TableCell>Vendor</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>QT</TableCell>
                        <TableCell>$</TableCell>
                        <TableCell>PFR</TableCell>
                        <TableCell>$</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((x,i) => {
                        return (
                            <TableRow key={i} className="table-body-row-nocolor">
                                <TableCell>{x.Vendor}</TableCell>
                                <TableCell>{x.Price}</TableCell>
                                <TableCell>{x.QT}</TableCell>
                                <TableCell>{x.S}</TableCell>
                                <TableCell>{x.PFR}</TableCell>
                                <TableCell>{x.$}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}