import React from 'react'
import { useLazyEmployeeListTicketsQuery, useUpdateEmployeeTicketMutation} from '../../services/ticketApi'

function EmployeeDashboard(){
    var id=JSON.parse(window.localStorage.getItem("user"))[0].id
    // var {isLoading,data}=useEmployeeListTicketsQuery(id)
    var [employeeFn,{isLoading,data}]=useLazyEmployeeListTicketsQuery(id)
    // console.log(empFn)
    // console.log(data)
    var [employeeUpdateFn]=useUpdateEmployeeTicketMutation()
    // var [listFn]=useLazyListTicketsQuery()
    var {username} = JSON.parse(window.localStorage.getItem("user"))[0]


    // var id=JSON.parse(window.localStorage.getItem("user"))[0].id
    // var [employeeFn]=useLazyEmployeeListTicketsQuery(id)
    // var {isLoading,data}=useEmployeeListTicketsQuery()
    // var [employeeUpdateFn]=useUpdateEmployeeTicketMutation()
    // var [allTicketsFn]=useLazyListTicketsQuery()

    function issueCompleteBtn(tkt){
        // var temp=data.map((a)=>{
        // return {...a}
        // })
        // temp[i].status="completed"
        // // console.log(temp);
        var status="completed"
        var updateEmployeeData={...tkt,status}
        console.log(updateEmployeeData) 
        employeeUpdateFn(updateEmployeeData).then(()=>{
            alert("completed")
            employeeFn(id)
        })
        // allTicketsFn()
        // listFn()
    }

    React.useEffect(()=>{
        employeeFn(id)
    },[employeeFn,id])

    return (
        <div>
        <h3 className='mb-5'>{username.toUpperCase()+" "}EmployeeDashboard</h3>
        <table className='table table-bordered table-secondary' style={{width:"650px",marginLeft:"23%"}}>
            <thead>
                <tr align="center">
                    <th>Issue</th>
                    <th>CustomerDetails</th>
                    <th>Action</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    !isLoading && data?.map((ticket,i)=>{
                        // console.log(data[i].status)
                        // console.log();
                        return (<tr align="center">
                            <td>{ticket.issue}</td>
                            <td>{ticket.customerName}</td>
                            <td><button onClick={()=>{issueCompleteBtn(ticket)}} disabled={ticket.status==="completed"}>complete</button></td>
                            <td>{ticket.status}</td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
        </div>
    )
}
export default EmployeeDashboard