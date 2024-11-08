import "./auth.css"
import Form from "./Form";
import { useEffect, useState } from "react";
import NameInput from "./Inputs/NameInput";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function Edit(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [message,SetMessage] = useState("")
    const [formData,SetFormData] = useState({
        name:"",email:"",password:"",passwordConfirmation:""
    })

    const handleInput =  (e)=>{
        const {name,value} = e.target
        SetMessage("")
        if(name!=="name" || value.length<=20){

            SetFormData({...formData,[`${name}`]:value})
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const {name,email,password,passwordConfirmation} = formData
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(email)
        if(name.length===1){
            SetMessage("Name should be at leat 2 characters long")
            return
        }

        if(!isEmailValid){
            SetMessage("Email format is invalid")
            return     
        }
        if(password!==passwordConfirmation){
            SetMessage("Passwords are different")
            return
        }
        else{
            if(password.length<8){
                SetMessage("Password sholud be at least 8 characters long")
                return  
            }
        }
        const res = await axios.patch(`http://localhost:3000/edit/${id}`,formData,{withCredentials:true})
        
        if(res.data!=="Success"){
            SetMessage(res.data)
        }
        else{
            navigate(`/user/${id}`)
        }
    }

    useEffect(()=>{
        axios.get(`http://localhost:3000/${id}`,{withCredentials:true}).
        then((res)=>{
            const {name,email} = res.data
            if(res.data==="not logged"){
                navigate("/")
            }
            
            SetFormData({...formData,name,email})
            
        })
    },[])

    const content = 
    <>

        <div className=" d-flex flex-column align-items-center flex-md-row"> 
            <NameInput 
            value={formData.name}
            handleInput={handleInput}/>

            <EmailInput
            value={formData.email}
            handleInput={handleInput}/>
            
        </div>
        <div className=" d-flex flex-column align-items-center flex-md-row">

            <PasswordInput
            label="Password"name="password"
            value={formData.password} handleInput={handleInput}/>

            <PasswordInput
            label="Confirm Password"name="passwordConfirmation"
            value={formData.passwordConfirmation} handleInput={handleInput}/>  

        </div>

    </>

    return(

        <Form
        title={"EDIT"}
        content={content}
        submitFunc={handleSubmit}
        message={message}
        />

    )
}