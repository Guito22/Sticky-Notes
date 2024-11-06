import { TextField } from "@mui/material";

export default function NameInput({value,handleInput}){
    return(
        <TextField 
        className="authInput" label="Name" 
        name="name" type="text" 
        variant="filled" value={value}
        onInput={handleInput} required
        />
    )
}