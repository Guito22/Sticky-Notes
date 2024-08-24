import { Book, CalendarMonth, Home, Lightbulb, RocketLaunch } from "@mui/icons-material"
import { Modal,Box, IconButton } from "@mui/material"
import { useState } from "react"
export default function ListModalForm({openModal,SetOpenModal}){
    const [iconIndex,SetIconIndex] = useState(0)
    const icons = [
        <Book style={{color:"cyan"}}/>,
        <Lightbulb style={{color:"yellow"}}/>,
        <Home style={{color:"darkblue"}}/>,
        <RocketLaunch style={{color:"orange"}}/>,
        <CalendarMonth style={{color:"salmon"}}/>

    ]
    return(
        <Modal
        className="modal"
        open={openModal}
        onClose={()=>{SetOpenModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
            <Box className="modalForm">
                <h3 className="m-4">New List</h3>
                <label htmlFor="title">Title:</label>
                
                <input autoFocus type="text" name="title" id="title"/>
                <p>Icon:</p>
                <div id="iconsDiv">
                    {icons.map((i,index)=>{
                        return(
                            <IconButton 
                            onClick={()=>SetIconIndex(index)}
                            className="iconButton"
                            id={index===iconIndex ? "iconSelected":""}>
                                {i}
                            </IconButton>
                        )
                    })}
                </div>

                <div className="m-3 d-flex justify-content-end gap-2">
                    <button 
                    onClick={()=>SetOpenModal(false)}
                    className="btn btn-success"
                    >Create
                    </button>
                    <button 
                    onClick={()=>SetOpenModal(false)}
                    className="btn btn-secondary"
                    >Cancel</button>
                </div>

            </Box>
        </Modal> 
    )
}