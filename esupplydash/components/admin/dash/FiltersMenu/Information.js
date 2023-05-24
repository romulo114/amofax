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

export default function Information({columns}){
    
    function RenderColumns(){
        if(!columns) return <></>

        let render = [ ...columns ];

        while(render.length < 5){
            render.push(
                {key:'', value:''}
            )
        }

        return render.map( (x,i) => {

            if(x.key !== 'radio'){
                return(
                    <TableRow className="table-body-row-black" key={i}>
                        <TableCell>{x.key}</TableCell>
                        <TableCell className="bold">{x.value}</TableCell>
                    </TableRow>
                )
            }

            if(x.key === 'radio'){
                return(
                    <TableRow className="table-body-row-black" key={i}>
                        <TableCell><input type="radio" name="radio"/></TableCell>
                        <TableCell className="bold">{x.value}</TableCell>
                    </TableRow>
                )
            }
        })
    }

    return(
        <TableContainer>
            <Table>
                <TableHead>

                </TableHead>
                <TableBody className="">
                    {RenderColumns()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}