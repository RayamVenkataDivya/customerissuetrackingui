import React, { useEffect, useState } from 'react'
import { useGetAllEmployeesQuery, useGetAllCustomerUsersQuery } from '../../services/userApi';
import { useLazyListTicketsQuery, useListTicketsQuery, useUpdateTicketMutation } from '../../services/ticketApi';
import { useDispatch, useSelector } from "react-redux"
import { setData, setSearch } from '../user/loginSlice';

function ManagerDashboard() {
  var { username } = JSON.parse(window.localStorage.getItem("user"))[0]
  var { isLoading: employeesLoading, data: employeesData } = useGetAllEmployeesQuery();
  //  var [empFn]= useLazyGetAllEmployeesQuery()
  var [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  var [updatedTicketFn] = useUpdateTicketMutation();
  var [ticketsFn, { data, isLoading }] = useLazyListTicketsQuery()
  const dispatch = useDispatch()
  var [allpro, setAllpro] = useState()
  let { slicedata, searchword, radio, checkbox } = useSelector(state => state.loginReducer)


  function assignTicketToEmployee(tkt) {
    var updatedTicket = { ...tkt, employeeId: selectedEmployeeId };
    // alert(JSON.stringify(updatedTicket))
    updatedTicketFn(updatedTicket).then((res) => {
      alert("Ticket Assigned Successfully")
      ticketsFn().then((res) => { setAllpro(res.data) })
    });
  }
  useEffect(() => {
    ticketsFn().then((res) => {
      setAllpro(res.data)
      dispatch(setData(res.data))
    })
  }, [])

  function search(e) {
    checkfilters({"searchkey":e.target.value})
  }

  function sortStatus(e) {
    var filterStatus = data.filter((t) => {
      if (t.status === e.target.value) {
        return t
      }
      return filterStatus
    })
  }

  // function checkproducts(pro) {
  //   let x = allpro.filter((ele) => {
  //     if (
  //       pro.some((a) => a === ele.productName)
  //     ) {
  //       return true
  //     }
  //     return false
  //   })
  //   setAllpro([...x])
  // }


  function checkfilters(props) {
    let filteringData=slicedata
    console.log("searchword",props.searchkey);
    if (props.searchkey) {
      var filteredTickets = filteringData.filter((t) => {
        return t.productName.toLowerCase().includes(props.searchkey)
      })
      console.log(filteredTickets);
      dispatch(setData(filteredTickets))
    }
    else {
      dispatch(setData(allpro))
    }
  }

 

  return (
    <div className='container'>
      <h3 className='mb-5'>{username.toUpperCase() + "'" + "S" + " "}ManagerDashboard</h3>
      <div style={{ marginBottom: "20px", marginLeft: "450px" }}>
        <input type="text" placeholder='Search...' style={{ width: "350px", borderRadius: "4px" }} onKeyUp={(event) => { search(event) }}></input><br />
      </div>
      <div>
        <h4>Sort By Status:</h4>
        <input type='radio' onChange={(event) => { sortStatus(event) }} name="tkt" value="completed" id="t1" /><label for="t1">sort(completed)</label><br />
        <input type='radio' onChange={(event) => { sortStatus(event) }} name="tkt" value="ticketRaised" id="t2" /><label for="t2">sort(ticketRaised)</label><br />
        <input type='radio' onChange={(event) => { sortStatus(event) }} name="tkt" value="customer rejected" id="t3" /><label for="t3">sort(customer rejected)</label>
      </div>
      
      {/* <div>
        <h4>sortBy productName:</h4>
        <input type="checkbox" name="product" value="electric" id="d1" onChange={(e) => { handleCheckbox(e) }} /><label for="d1">electric</label><br />
        <input type="checkbox" name="product" value="building" id="d2" onChange={(e) => { handleCheckbox(e) }} /> <label for="d2">building</label><br />
        <input type="checkbox" name="product" value="water" id="d3" onChange={(e) => { handleCheckbox(e) }} /><label for="d3">water</label>
      </div> */}

      <table className='table table-bordered table-secondary' style={{ width: "650px", marginLeft: "23%" }}>
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
            (!isLoading && !employeesLoading) && slicedata?.map((ticket) => {
              // console.log(ticket)
              return (<tr align="center">
                <td>{ticket.issue}</td>
                <td>{ticket.productName}</td>
                <td>
                  <select onChange={(e) => { setSelectedEmployeeId(e.target.value) }}>
                    <option value="null" disabled selected>Please Select Employee</option>
                    {ticket.employeeId && <option value={ticket.employeeId} selected>{employeesData.find((a) => a.id == ticket.employeeId).username}</option>}
                    {!ticket.employeeId && employeesData.map((employee) => {
                      return <option value={employee.id}  >{employee.username}</option>
                    })
                    }
                  </select>
                </td>
                <td>{ticket.customerName}</td>
                <td>
                  {
                    !ticket.employeeId && <button onClick={() => { assignTicketToEmployee(ticket) }}>Assign</button>
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
                    ticket.status === "completed" && <h6>{ticket.status}</h6>
                  }
                  {
                    ticket.status === "ticketRaised" && <h6>{ticket.status}</h6>
                  }
                  {
                    ticket.status === "customer rejected" && <h6>{ticket.status}</h6>
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