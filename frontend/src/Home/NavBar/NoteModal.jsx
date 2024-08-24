import { Modal,Box, Checkbox } from "@mui/material";
import { useState } from "react";

export default function NoteModal({open,SetOpen}){
    const [colorIndex,SetColorIndex] = useState(0)
    const colors = ["#373737","tomato","blue","orange","green"]
    return(
        <Modal
        className="modal"
        open={open}
        onClose={()=>{SetOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
            <Box className="modalForm">
                
                <h3 className="m-4">New Note</h3>
                <textarea autoFocus placeholder="Write your note..." id="contentNote"/>
                <div className="d-flex">
                    {colors.map((i,index)=>{
                        return(
                            <div 
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
                    <button  
                    onClick={()=>SetOpen(false)}
                    className="btn btn-success"
                    >Create</button>
                    <button 
                    onClick={()=>SetOpen(false)}
                    className="btn btn-secondary"
                    >Cancel</button>
                </div>

            </Box>
        </Modal>  
    )
}