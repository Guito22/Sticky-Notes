import { useNavigate } from "react-router-dom";
import "./auth.css"
import { useState } from "react";
import axios from "axios"
import Form from "./Form";
import NameInput from "./Inputs/NameInput";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";

export default function SignUp(){
    const navigate = useNavigate()
    const [message,SetMessage] = useState()
    const [formData,SetFormData] = useState({
        name:"",email:"",password:"",passwordConfirmation:""
    })

    const handleInput =  (e)=>{
        const {name,value} = e.target
        SetMessage("")
        if(value.includes(" ")){
            return
        }
        const letterTest = /^[a-zA-Zá-úÁ-Ú]$/
        //to make sure the user only enters letters
        if(name=="name" && !Array.from(value).every(i=>letterTest.test(i))){
            return
        }
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
        const res = await axios.post("http://localhost:3000/signup",{...formData,color:"turquoise",theme:"dark"},{withCredentials:true})
        if(!res.data){
            SetMessage("That email is already registered")
        }
        else{
            navigate("/login")
        }
    }

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
        title={"SIGN UP"}
        content={content}
        submitFunc={handleSubmit}
        message={message}
        />

    )
}