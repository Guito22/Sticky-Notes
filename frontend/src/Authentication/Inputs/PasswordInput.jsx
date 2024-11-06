import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { useState } from "react"

export default function PasswordInput({label,name,value,handleInput}){
    const [passwordEye,SetPasswordEye] = useState(false)
    const togglePasswordEye = ()=>{
        SetPasswordEye(!passwordEye)
    }
    return(
        <TextField 
            className="authInput" 
            InputProps={{
                endAdornment:
                <IconButton onClick={togglePasswordEye}>
                    {passwordEye ?
                        <Visibility/> : <VisibilityOff/>
                    }
                </IconButton>}} 
            label={label} type={passwordEye ? "text":"password"} 
            name={name} variant="filled"
            value={value} onInput={handleInput}
            required

            />
    )
}