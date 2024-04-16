import React, { useEffect } from "react";
import { useFormik } from "formik";
import {  useLazyAuthenticateQuery } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedin } from "./loginSlice";
import { useSelector } from "react-redux";
import * as Yup from "yup";

function Login(){
    var navigate = useNavigate()
    var [loginFn]=useLazyAuthenticateQuery()
    var {isLoggedin}=useSelector((state)=>{return state.loginReducer})

    var dispatch=useDispatch()

    useEffect(()=>{
        if(isLoggedin){
            // console.log(isLoggedin)
            navigate("/dashboard")
        }
    },[])

    var loginForm=useFormik({
        initialValues:{username:"",password:""},

        validationSchema:Yup.object({
            username:Yup.string().required(),
            password:Yup.string().required(),
        }),
        
        onSubmit:(values)=>{
            // alert(JSON.stringify(values))
            loginFn(values).then((res)=>{
                // alert(JSON.stringify(res))
                window.localStorage.setItem("user",JSON.stringify(res.data))
                if(res.data.length===0){
                    alert("check your details")
                    navigate("/login")
                }
                else{
                    dispatch(setLoggedin(true))
                    navigate("/dashboard")
                }
            })
        }
    })
    // var {username,role} = JSON.parse(window.localStorage.getItem("user"))[0]
    var {isLoggedin}=useSelector((state)=>{return state.loginReducer})

    // var navigate=useNavigate()

    React.useEffect(()=>{
        if(!isLoggedin){
            // console.log(isLoggedin)
            navigate("/login")
        }
    },[])

    return (
        <div className="">
            <div className="" style={{marginTop:"10%",marginLeft:"40%",border:"2px solid",marginRight:"45%",padding:"25px",width:"250px",borderRadius:"16px"}}>
                <form onSubmit={loginForm.handleSubmit} >
                    <h4 className="text-center">LOGIN</h4>
                    <label for="username" className="my-2">Username:</label><br/>
                    <input type="text" id="username" name="username" placeholder="Enter username" onChange={loginForm.handleChange} style={{borderRadius:"5px"}}/><br/>
                    <label for="password" className="my-2">Password:</label><br/>
                    <input type="text" id="password" name="password" onChange={loginForm.handleChange} placeholder="Enter username" style={{borderRadius:"5px"}}/><br/><br/>
                    <button type='submit' style={{marginLeft:"60px",borderRadius:"10px"}} className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;