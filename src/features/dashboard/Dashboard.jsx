import React, { useEffect } from 'react'
import CustomerDashboard from './CustomerDashboard'
import ManagerDashboard from './ManagerDashboard'
import EmployeeDashboard from './EmployeeDashboard'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Dashboard(){
    // console.log(userDetails)
    var {isLoggedin}=useSelector((state)=>{return state.loginReducer})
    // console.log(isLoggedin)
    // dispatch=useDispatch()
    var navigate = useNavigate()
    
    useEffect(()=>{
        if(!isLoggedin){
            // console.log(isLoggedin)
            navigate("/login")
        }
    },[isLoggedin,navigate])

    if(JSON.parse(window.localStorage.getItem("user")))

    var {role} = JSON.parse(window.localStorage.getItem("user"))[0]
    // console.log(isLoggedin);
    return (
        <div className='container'>
            {/* <h2>Dashboard of {role}</h2> */}
            {
                role==="customer" && <CustomerDashboard></CustomerDashboard>
            }
            {
                role==="manager"&& <ManagerDashboard></ManagerDashboard>
            }
            {
                role==="employee" && <EmployeeDashboard></EmployeeDashboard>
            }
        </div>
    )
}
export default Dashboard