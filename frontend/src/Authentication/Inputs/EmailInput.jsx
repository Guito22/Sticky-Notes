import { TextField } from "@mui/material";

export default function EmailInput({value,handleInput}){
    return(
        <TextField 
        className="authInput" label="Email" 
        type="email" name="email"
        variant="filled"value={value}
        onInput={handleInput} required
        
        />
    )
}