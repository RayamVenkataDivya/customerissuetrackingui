import React from 'react'
import { useAddCustomersMutation } from '../../services/userApi'
import { useNavigate } from 'react-router-dom'

function AddBook(){
    var [newCustomer,setNewCustomer]=React.useState({username:"",password:"",role:""})
    // var [addNewBook] = useAddBookMutation()
    // var [refetchBook] = use()
    // console.log(x)
    var navigate=useNavigate()
    var [customer]=useAddCustomersMutation()
    function addBook(){
        // addNewBook(newBook).then(()=>{
        //     refetchBook()
        // })
        customer(newCustomer) 
        navigate("/login")
    }
    
    return (
        <div style={{marginTop:"10%",marginLeft:"40%",border:"2px solid",marginRight:"45%",padding:"25px",width:"250px",borderRadius:"16px"}}>
            <h3 className="text-center">SIGNUP</h3>
            <form onSubmit={()=>{addBook()}}>
                <label for="username" className="my-1">Username:</label><br/>
                <input type="text" placeholder='enter username' id="username" onKeyUp={(e)=>{setNewCustomer({...newCustomer,username:e.target.value})}} required style={{borderRadius:"5px"}}/><br/>
                <label for="password" className="my-1">Password:</label>
                <input type="text" placeholder='enter password' id="password" onKeyUp={(e)=>{setNewCustomer({...newCustomer,password:e.target.value})}} required style={{borderRadius:"5px"}}/><br/>
                {/* <input type="text" placeholder='enter role' onKeyUp={(e)=>{setNewCustomer({...newCustomer,role:e.target.value})}}/><br/> */}
                <div style={{marginTop:"15px"}}>
                    <label for="role">Role:</label>&nbsp;&nbsp;
                    <select name="" id="for" onChange={(e)=>{setNewCustomer({...newCustomer,role:e.target.value})}} required style={{borderRadius:"5px"}}>
                        <option value="null" disabled selected >Please Select</option>
                        <option value="customer" >customer</option>
                        <option value="employee" >employee</option>
                    </select>
                </div>
                <button type="submit" style={{marginLeft:"35px",borderRadius:"10px",marginTop:"15px"}} className="btn btn-primary">Add NewUser</button>
            </form>
        </div>
    )
}
export default AddBook;