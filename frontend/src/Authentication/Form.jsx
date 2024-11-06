import { LockOutlined, ModeEditOutlined } from "@mui/icons-material"
import { Alert, Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function Form({title,content,submitFunc,message}){

    const getColors = ()=>{
        switch(title){
            case "LOG IN":
                return {aside:"primary",form:"lightblue",btn:"primary"}
            case "SIGN UP":
                return {aside:"success",form:"rgb(189, 238, 189)",btn:"success"}
            default:
                return {aside:"warning",form:"lightyellow",btn:"success"}

        }
    }
    const colors = getColors()
    return(
        <div id="authDiv">
            
            <aside id="authLock" className={`bg-${colors.aside}`}>
                {title==="EDIT" ?
                    <ModeEditOutlined style={{color:"white",fontSize:"4rem"}}/> :
                    <LockOutlined style={{color:"white",fontSize:"4rem"}}/>
                }
            </aside>

            <form onSubmit={submitFunc} id="authForm" style={{backgroundColor:colors.form}}>
                
                <h2 id="authTitle">{title!=="EDIT" ? title : "EDIT PROFILE"}</h2>
                    
                <div id="alertDiv">

                    <Alert 
                    id="formAlert" 
                    severity={message ? "warning":""} 
                    color={message ? "warning":""}>
                        {message}
                    </Alert>
                </div>

                {content}

                {title=="LOG IN" &&
                    <p>Don't have an account? <Link id="formLink" to="/signup">Sign up</Link></p> 
                } 

                {title=="SIGN UP" &&
                    <p>Already have an account? <Link id="formLink" to="/login">Log in</Link></p> 
                }

                <Button 
                type="submit"
                style={{textTransform:"capitalize",marginTop:"1rem"}} 
                color={colors.btn} variant="contained">
                    {title}
                </Button>

            </form>
        </div>
    )
}