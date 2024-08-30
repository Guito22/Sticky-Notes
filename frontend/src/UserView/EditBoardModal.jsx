import { Book, CalendarMonth, Home, Lightbulb, RocketLaunch } from "@mui/icons-material"
import { Modal,Box, IconButton, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { userContext } from "./Context"

export default function EditBoardModal(){
    const {id} = useParams()
    const {user,loadData,boardIndex,openEditModal,SetOpenEditModal} = useContext(userContext)
    const [title,SetTitle] = useState("")
    const updateTitle = (e)=>{
        if(e.target.value.length<=30){

            SetTitle(e.target.value)
        }
    }
    const [iconIndex,SetIconIndex] = useState(0)
    const iconList = [
        {
            name:"home",
            icon:<Book style={{color:"cyan"}}/>
        },
        {
            name:"lightbulb",
            icon:<Lightbulb style={{color:"yellow"}}/>,
        },
        {
            name:"home",
            icon:<Home style={{color:"darkblue"}}/>
        },
        {
            name:"rocket",
            icon:<RocketLaunch style={{color:"orange"}}/>,
        },
        {
            name:"calendar",
            icon:<CalendarMonth style={{color:"salmon"}}/>
        }
    ]
    //this effect allows to get user values everytime the modal is opened
    useEffect(()=>{
        
        if(user.boards){
            SetTitle(user.boards[boardIndex].title)
            const boardIconIndex = iconList.findIndex(i=>{
                return i.name===user.boards[boardIndex].icon
            })
            SetIconIndex(boardIconIndex)
        } 
            
    },[openEditModal])
    
    const updateBoard = async()=>{
        if(title){
            const res = await axios.patch(`http://localhost:3000/${id}/editBoard/${user.boards[boardIndex]._id}`,
                {title,icon:iconList[iconIndex].name},{withCredentials:true})
                if(res.data==="success"){
                    
                    loadData()
                    SetOpenEditModal(false)
                }
        }
    }

    return(
        <Modal
        className="modal"
        open={openEditModal}
        onClose={()=>{
            SetOpenEditModal(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
            <Box className="modalForm">
                <h3 className="m-4">Edit Board</h3>

                <label htmlFor="title">Title:</label>
                
                <input autoFocus value={title} onInput={updateTitle} type="text" name="title" id="title"/>
                
                <p>Icon:</p>
                <div id="iconsDiv">
                    {iconList.map((i,index)=>{
                        return(
                            <IconButton 
                            key={index}
                            onClick={()=>SetIconIndex(index)}
                            className="iconButton"
                            id={index===iconIndex ? "iconSelected":""}>
                                {i.icon}
                            </IconButton>
                        )
                    })}
                </div>

                <div className="m-3 d-flex justify-content-end gap-2">
                    <Button 
                    color="secondary"
                    style={{textTransform:"none"}}
                    onClick={updateBoard}
                    variant="contained"
                    >Update
                    </Button>
                    <Button 
                    
                    style={{textTransform:"none",backgroundColor:"slategray"}}
                    onClick={()=>{
                        SetIconIndex(0)
                        SetOpenEditModal(false)}}
                    variant="contained"
                    >Cancel</Button>
                </div>

            </Box>
        </Modal> 
    )
}