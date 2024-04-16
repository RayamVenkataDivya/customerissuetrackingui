import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoggedin } from '../user/loginSlice'

function Navbar(){
    // var [loggedin,setLoggedin]=React.useState(false)
    var isLoggedin = useSelector((state)=>(state.loginReducer.isLoggedin))
    var navigate=useNavigate()
    var dispatch=useDispatch()
    

    // React.useEffect(()=>{
    //     if(window.localStorage.getItem("user")){
    //         setLoggedin(true)
    //     }else{
    //         setLoggedin(false)
    //         navigate("/login")
    //     }

    // },[])
    // var {username,role} = JSON.parse(window.localStorage.getItem("user"))[0]


    function logout(){
        window.localStorage.removeItem("user")
        dispatch(setLoggedin(false))
        navigate("/login")
    }
    function signUp(){
        navigate("/signUp")
    }
    function login(){
        navigate("/login")
    }
    return (
        <nav class="navbar navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-between">
            <h3 class="navbar-brand fs-2">Customer Issue Tracking System</h3>
            <div class="" id="">
                {
                    isLoggedin && (
                        <>
                            <button className="btn btn-light"  style={{marginRight:"60px"}} onClick={()=>{logout()}}>Logout</button><br/>
                        </>
                    )
                }
                {
                    !isLoggedin && (
                        <div style={{marginRight:"60px"}}>
                            <button  class="btn btn-light" onClick={()=>{login()}}>Login</button>&nbsp;&nbsp;
                            <button  class="btn btn-light" onClick={()=>{signUp()}}>SignUp</button>                  
                        </div>
                    )
                }
                &nbsp;&nbsp;&nbsp;
                {
                }
            </div>
        </div>
        </nav>
    )
}
export default Navbar