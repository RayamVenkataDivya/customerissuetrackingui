import React, { useEffect, useState } from 'react'
import { useGetAllEmployeesQuery} from '../../services/userApi';
import { useLazyListTicketsQuery, useUpdateTicketMutation } from '../../services/ticketApi';

function ManagerDashboard() {
  var { username } = JSON.parse(window.localStorage.getItem("user"))[0]
  var { isLoading: employeesLoading, data: employeesData } = useGetAllEmployeesQuery();
  //  var [empFn]= useLazyGetAllEmployeesQuery()
  var [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  var [updatedTicketFn] = useUpdateTicketMutation();
  var [ticketsFn, { data, isLoading }] = useLazyListTicketsQuery()
  var [allpro, setAllpro] = useState()
  var [sortObj, setObj] = useState({
    search: "",
    radio: "",
    checkbox:[]
  })
  function assignTicketToEmployee(tkt) {
    var updatedTicket = { ...tkt, employeeId: selectedEmployeeId };

    // alert(JSON.stringify(updatedTicket))
    updatedTicketFn(updatedTicket).then((res) => {
      alert("Ticket Assigned Successfully")
      ticketsFn().then((res) => { setAllpro(res.data) })
    });
  }

  useEffect(() => {
    ticketsFn().then((res) => { setAllpro(res.data) })
  }, [ticketsFn])

  function search(e) {
    setObj({ ...sortObj, search: e.target.value })
    checkfilters({ ...sortObj, search: e.target.value })
  }

  function sortRadio(e) {
    setObj({ ...sortObj, radio: e.target.value })
    checkfilters({ ...sortObj, radio: e.target.value })
  }

  // function sortCheckbox(e){
  //   setObj({...sortObj, checkbox: e.target.value})
  //   checkfilters({...sortObj,checkbox: e.target.value})
  // }
  
  function sortCheckbox(e){
    let checkArr=sortObj.checkbox
    if(e.target.checked)
    {
      checkArr.push(e.target.value)
    }
    else{
      checkArr.splice(checkArr.indexOf(e.target.value),1)
    }
    // console.log(checkArr);
    setObj({...sortObj,checkbox: checkArr})
    checkfilters({...sortObj, checkbox:checkArr})
  }

  function checkfilters(a) {
    let filterData = data
    console.log(a);
    if (a.search) {
      filterData = filterData.filter((t) => {
        return t.issue.toLowerCase().startsWith(a.search)
      })
    }
    if (a.radio) {
      console.log(a.radio);
      filterData = filterData.filter((t) => t.status === a.radio)
    }
    if(a.checkbox.length)
    {
      filterData=filterData.filter((t)=>{
        console.log(t)
        return a.checkbox.some((ele)=>ele===t.IssueType)
      })
    }
    setAllpro(filterData)
  }


  return (
    <div className='container'>
      <h3 className='mb-5'>{username.toUpperCase() +" "}ManagerDashboard</h3>
      <div style={{ marginBottom: "20px", marginLeft: "450px" }}>
        <input type="text" placeholder='Search...' style={{ width: "350px", borderRadius: "4px" }} onKeyUp={(event) => { search(event) }}></input><br />
      </div>
      <div>
        <h4>Sort By Status:</h4>
        <input type='radio' onChange={(event) => { sortRadio(event) }} name="tkt" value="completed" id="t1" /><label for="t1">sort(completed)</label><br />
        <input type='radio' onChange={(event) => { sortRadio(event) }} name="tkt" value="ticketRaised" id="t2" /><label for="t2">sort(ticketRaised)</label><br />
        <input type='radio' onChange={(event) => { sortRadio(event) }} name="tkt" value="customer rejected" id="t3" /><label for="t3">sort(customer rejected)</label>
      </div>
      <div>
        <h4>sortBy productName:</h4>
        <input type="checkbox" name="product" value="electric" id="d1" onChange={(e) => { sortCheckbox(e) }} /><label for="d1">electric</label><br />
        <input type="checkbox" name="product" value="building" id="d2" onChange={(e) => { sortCheckbox(e) }} /> <label for="d2">building</label><br />
        <input type="checkbox" name="product" value="water" id="d3" onChange={(e) => { sortCheckbox(e) }} /><label for="d3">water</label>
      </div>
      <table className='table table-bordered table-secondary' style={{ width: "650px", marginLeft: "23%" }}>
        <thead>
          <tr align="center">
            <th scope="col">Issue</th>
            <th>IssueType</th>
            <th scope="col">Selection</th>
            <th scope="col">CustomerDetails</th>
            <th scope="col">Action</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            (!isLoading && !employeesLoading) && allpro?.map((ticket) => {
              // console.log(ticket)
              return (<tr align="center">
                <td>{ticket.issue}</td>
                <td>{ticket.IssueType}</td>
                <td>
                  <select onChange={(e) => { setSelectedEmployeeId(e.target.value) }}>
                    <option value="null" disabled selected>Please Select Employee</option>
                    {ticket.employeeId && <option value={ticket.employeeId} selected>{employeesData.find((a) => a.id === ticket.employeeId).username}</option>}
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