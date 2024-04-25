import React from "react";
import { useLazyListTicketsByUserIdQuery, useLazyListTicketsQuery, useListTicketsByUserIdQuery, useListTicketsQuery, useUpdateTicketMutation } from "../../services/ticketApi";
function ListTickets(){
    var cid=JSON.parse(window.localStorage.getItem("user"))[0].id
    // console.log(cid)
    // var {isLoading,data}=useListTicketsQuery()
    // var {isLoading,data}=useListTicketsByUserIdQuery(cid)

    // var [listTicketsFn]=useLazyListTicketsQuery()
    var [fn,{isLoading,data}]=useLazyListTicketsByUserIdQuery()
    // var [resdata,setData]=React.useState()
    // var [updatedTicketFn] = useUpdateTicketMutation();
    // var [ticketFn]=useLazyListTicketsQuery()

    React.useEffect(()=>{

        // listTicketsFn()
        fn(cid)
    },[])
    // console.log(data)
  var [updatedTicketFn] = useUpdateTicketMutation();
  
    // function rejectBtn(tkt){
    //     var status="customer rejected"
    //     var updateStatus={...tkt,status}
    //     updatedTicketFn(updateStatus).then((res)=>{
    //         ticketFn()
    //     })
    //     // console.log(updateStatus)
    //     // updatedTicketFn(updateStatus).then(()=>{
    //     //     alert("ticket rejected")
    //     // })
    // }

    function rejectBtn(tkt){
        const {employeeId,...rest}=tkt
        const newTicket={...rest,status:"customer rejected"}
        console.log(newTicket)
        updatedTicketFn(newTicket).then((res)=>{
            fn(cid)
        })
    }

    
    
// console.log(data);
    return(
        <div>
            <h4 style={{marginLeft:"10px"}}>List of Tickets</h4>
            {
                isLoading && (<h4>Loading...</h4>)
            }
            {
                !isLoading && (
                    <table className='table table-bordered table-secondary'style={{width:"650px",marginLeft:"45px"}}>
                        <thead>
                            <tr align="center">
                                <th>Issue</th>
                                <th>IssueType</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            !isLoading && data?.map((ticket)=>{
                                return (
                                    <tr align='center'>
                                        <td>{ticket.issue}</td>
                                        <td>{ticket.IssueType}</td>
                                        {/* <td>{ticket.status}</td> */}
                                        {ticket.status==="ticketRaised" && <td>{ticket.status}</td>}
                                        {ticket.status==="completed" && <td>
                                            {ticket.status}&nbsp;
                                            <button className="btn btn-success">satisfied</button>&nbsp;
                                            <button className="btn btn-primary">not satisfied</button>&nbsp;
                                            <button className="btn btn-danger" onClick={()=>{rejectBtn(ticket)}}>rejected</button>
                                        </td>}
                                        {
                                            ticket.status==="customer rejected" && <td>{ticket.status}</td>
                                        }
                                    </tr>
                                )
                            })
                           }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
export default ListTickets