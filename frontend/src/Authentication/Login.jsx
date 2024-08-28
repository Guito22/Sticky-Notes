import Form from "./Form";
import { useState } from "react";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const [formData,SetFormData] = useState({email:"",password:""})
    const [message,SetMessage] = useState("")
    const handleInput =  (e)=>{
        const {name,value} = e.target
        SetMessage("")
        if(value.includes(" ")){
            return
        }

        SetFormData({...formData,[`${name}`]:value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const {email,password} = formData
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(email)

        if(!isEmailValid){
            SetMessage("Email format is invalid")
            return     
        }
    
        if(password.length<8){
            SetMessage("Password sholud be at least 8 characters long")
            return  
        }
        
        const res = await axios.post("http://localhost:3000/login",{...formData},{withCredentials:true})
        if(res.data==="Error"){
            SetMessage("Email or password is invalid")
        }
        else{
            navigate("/user/123")
        }
    }

    const content = 
    <>

        <EmailInput value={formData.email} handleInput={handleInput}/>
        <PasswordInput 
        label="Password"
        name="password"
        value={formData.password} 
        handleInput={handleInput}/>

    </>
    return(
        <Form
        title={"LOG IN"}
        content={content}
        message={message}
        submitFunc={handleSubmit}
        />
    )
}