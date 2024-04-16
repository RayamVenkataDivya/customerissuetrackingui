import { useFormik } from 'formik'
import React from 'react'
import { useAddTicketMutation, useLazyListTicketsQuery } from '../../services/ticketApi'
import { useNavigate } from 'react-router-dom'

function AddTicket(){
   var [addTicketFn]= useAddTicketMutation()
   var [getListTickets]=useLazyListTicketsQuery()
   var navigate=useNavigate()

    var ticketForm = useFormik({
        initialValues:{
            issue:"",
            IssueType:"",
            image:"",
            date:Date.now(),
            customerId:JSON.parse(window.localStorage.getItem("user"))[0].id,
            customerName:JSON.parse(window.localStorage.getItem("user"))[0].username,
            status:"ticketRaised"
        },
        onSubmit:(values)=>{
            // console.log(JSON.stringify(values))
            addTicketFn(values).then((res)=>{
                // console.log(res)
                // alert(JSON.stringify(res))
                navigate("/dashboard/listTickets")
                getListTickets()

            }).catch((err)=>{
                alert(JSON.stringify(err))
            })
        }
    })
    return (
        <div>
            <h4 style={{marginLeft:"10px"}}>Add NewTicket</h4>
            <div style={{marginLeft:"200px"}}>
                <form onSubmit={ticketForm.handleSubmit}>
                    <div className='d-flex align-items-center pb-3'>
                        <label for="issue" style={{fontWeight:"70px"}}>Issue:</label>&nbsp;
                        <textarea name="issue" onChange={ticketForm.handleChange} id="issue" style={{width:"250px"}}></textarea><br/>
                    </div>
                    <div>
                        <label for="name" style={{fontWeight:"70px"}}>IssueType:</label>&nbsp;
                        <input type='text' name="IssueType" id="name" onChange={ticketForm.handleChange} ></input><br/>
                    </div>
                    <button className='btn btn-secondary' style={{marginLeft:"100px",marginTop:"20px"}}>Add Ticket</button>
                </form>
            </div>
            
        </div>
    )
}
export default AddTicket