import { useEffect } from "react";

export default function Table({data, headers}){

    useEffect( () => {
        console.log(data)
    })

    function renderObject(x){
        let el = [];

        for(let key in x){

        }
    }
    return(
		<table>
			<thead>
				<tr>
                    {headers.map(x => <th>{x}</th>)}
				</tr>
			</thead>
			<tbody>
                {data.map(x => (
                    <tr>
                        {Object.keys(x).map(key => (
                            <td>
                                {x[key]}
                            </td>
                        ))}
                    </tr>
                ))}
			</tbody>
		</table>
    )
}