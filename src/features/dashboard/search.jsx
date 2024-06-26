import React, { useEffect, useState } from 'react'
import { useGetAllEmployeesQuery, useGetAllCustomerUsersQuery } from '../../services/userApi';
import { useLazyListTicketsQuery,useListTicketsQuery,useUpdateTicketMutation } from '../../services/ticketApi';

function ManagerDashboard() {
  var {username} = JSON.parse(window.localStorage.getItem("user"))[0]
  var {isLoading:employeesLoading,data:employeesData} = useGetAllEmployeesQuery();
//  var [empFn]= useLazyGetAllEmployeesQuery()
  var [selectedEmployeeId,setSelectedEmployeeId]=useState(null)
  var [updatedTicketFn] = useUpdateTicketMutation();
  var [ticketsFn,{data,isLoading}]=useLazyListTicketsQuery()
  var [allpro,setAllpro]=useState()
  // var [sortStatus,setSortStatus]=useState()
  function assignTicketToEmployee(tkt){
    var updatedTicket={...tkt,employeeId:selectedEmployeeId};
    
    // alert(JSON.stringify(updatedTicket))
    updatedTicketFn(updatedTicket).then((res)=>{
        alert("Ticket Assigned Successfully")
        ticketsFn().then((res)=>{setAllpro(res.data)})
    });
  }
  useEffect(()=>{
    ticketsFn().then((res)=>{setAllpro(res.data)})
  },[])
   

  function search(e){
    var filteredTickets = data.filter((t)=>{
      return t.productName.toLowerCase().includes(e.target.value)    
    })
    setAllpro(filteredTickets)
  }

  function sortStatus(e){
    var filterStatus = data.filter((t)=>{
      if(t.status===e.target.value){
        return t
      }
      return filterStatus
      
    })
    console.log(filterStatus)
    setAllpro(filterStatus)
  }

  return (  
    <div className='container'>
        <h3 className='mb-5'>{username.toUpperCase()+"'"+"S"+" "}ManagerDashboard</h3>
        <div style={{marginBottom:"20px",marginLeft:"450px"}}>
            <input type="text" placeholder='Search...' style={{width:"350px",borderRadius:"4px"}} onKeyUp={(event)=>{search(event)}}></input><br/>
        </div>
        <div>
          <h4>Sort By Status:</h4>
          <input type='radio' onChange={(event)=>{sortStatus(event)}} name="tkt" value="completed" id="t1"/><label for="t1">sort(completed)</label><br/>
          <input type='radio' onChange={(event)=>{sortStatus(event)}} name="tkt" value="ticketRaised" id="t2"/><label for="t2">sort(ticketRaised)</label><br/>
          <input type='radio' onChange={(event)=>{sortStatus(event)}} name="tkt" value="customer rejected" id="t3"/><label for="t3">sort(customer rejected)</label>
        </div>
        <table className='table table-bordered table-secondary' style={{width:"650px",marginLeft:"23%"}}>
          <thead>
            <tr align="center">
              <th scope="col">Issue</th>
              <th>productName</th>
              <th scope="col">Selection</th>
              <th scope="col">CustomerDetails</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              (!isLoading && !employeesLoading) && allpro?.map((ticket)=>{
                // console.log(ticket)
                return (<tr align="center">
                    <td>{ticket.issue}</td>
                    <td>{ticket.productName}</td>
                    <td>
                      <select onChange={(e)=>{setSelectedEmployeeId(e.target.value)}}>
                            <option value="null" disabled selected>Please Select Employee</option>
                            {ticket.employeeId && <option value={ticket.employeeId} selected>{employeesData.find((a)=>a.id==ticket.employeeId).username}</option>}
                            {!ticket.employeeId && employeesData.map((employee)=>{
                                return <option value={employee.id}  >{employee.username}</option>
                            })
                            }
                      </select>
                    </td>
                    <td>{ticket.customerName}</td>
                    <td>
                        {
                            !ticket.employeeId   && <button onClick={()=>{assignTicketToEmployee(ticket)}}>Assign</button>
                        }
                        {
                            // ticket.status==="customer rejected" && <button onClick={()=>{assignTicketToEmployee(ticket)}}>reAssign</button>
                        }
                        {
                            ticket.employeeId && <button>Assigned</button>
                        }
                    </td>
                    <td>
                        {
                            ticket.status==="completed" && <h6>{ticket.status}</h6>
                        }
                        {
                            ticket.status==="ticketRaised" && <h6>{ticket.status}</h6>
                        }
                        {
                            ticket.status==="customer rejected" && <h6>{ticket.status}</h6>
                        }
                    </td>
                  </tr>)  
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default ManagerDashboard