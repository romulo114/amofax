export default function OrdersTable({orders}){
    return(
        <>
            <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th className="small">First Name</th>
                            <th className="small">Last Name</th>
                            <th className="small">Subtotal</th>
                            <th className="small">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {orders.map(x => <tr>
                                <td>{x.first_name}</td>
                                <td>{x.last_name}</td>
                                <td>{x.subtotal}</td>
                                <td>{new Date(x.created_at).toString()}</td>
                            </tr>)}
                        </tbody>
                    </table>
            </div>
        </>
    )
}