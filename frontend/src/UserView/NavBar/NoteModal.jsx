import { Modal,Box, Checkbox, Button } from "@mui/material";
import { useState } from "react";

export default function NoteModal({open,SetOpen}){
    const [colorIndex,SetColorIndex] = useState(0)
    const colors = ["#373737","tomato","blue","orangered","green"]
    return(
        <Modal
        className="modal"
        open={open}
        onClose={()=>{SetOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
            <Box className="modalForm">
                
                <h3 className="m-2">New Note</h3>

                <textarea 
                style={{backgroundColor:colors[colorIndex]}}
                autoFocus 
                placeholder="Write your note..." 
                id="contentNote"/>

                <div className="d-flex">
                    {colors.map((i,index)=>{
                        return(
                            <div 
                            key={index}
                            onClick={()=>SetColorIndex(index)}
                            id={colorIndex===index ? "selectedColor" : ""}
                            className="colorCircle bg-gradient" 
                            style={{backgroundColor:i,border:`1px solid ${i}`}}>

                            </div>
                        )
                    })}
                </div>

                <div className="d-flex align-items-center">
                    <Checkbox name="important" className="m-1" id="important"/>
                    <label htmlFor="important">Important</label>
                </div>

                <div className="m-3 d-flex justify-content-end gap-2">
                    <Button 
                    color="success"
                    style={{textTransform:"none"}}
                    onClick={()=>SetOpenl(false)}
                    variant="contained"
                    >Create
                    </Button>
                    
                    <Button 
                    style={{textTransform:"none",backgroundColor:"slategray"}}
                    onClick={()=>SetOpen(false)}
                    variant="contained"
                    >Cancel
                    </Button>
                </div>

            </Box>
        </Modal>  
    )
}