import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function CustomerDashboard(){
    var navigate=useNavigate()
    var {username,role} = JSON.parse(window.localStorage.getItem("user"))[0]
    return (
        <div>
            <h3>{username.toUpperCase()+"'"+"s"+" "+"CustomerDashboard"}</h3>
            <div style={{marginLeft:"20%",border:"1px solid",width:"750px",padding:"10px",marginTop:"100px",height:"100%"}}>
                <span style={{fontSize:"25px",fontWeight:"5px",marginLeft:"140px"}}>Customer DashBoard</span><br/>
                <div style={{marginLeft:"150px",marginTop:"10px"}}>
                    <Link>List of Tickets</Link>&nbsp;&nbsp;&nbsp;
                    <button onClick={()=>{navigate("addTicket")}}>Raise Ticket</button>
                </div>
                {/* <ListTickets></ListTickets> */}
                <Outlet></Outlet>
            </div>
        </div>
        
    )
}
export default CustomerDashboard