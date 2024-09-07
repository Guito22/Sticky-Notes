import { Book, CalendarMonth, Home, Lightbulb, RocketLaunch } from "@mui/icons-material"
import { Modal,Box, IconButton, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { userContext } from "../Context"

export default function BoardModalForm({openModal,SetOpenModal}){
    const {id} = useParams()
    const [iconIndex,SetIconIndex] = useState(0)
    const [title,SetTitle] = useState("")
    const {user,loadData,SetBoardIndex} = useContext(userContext)

    const updateTitle = (e)=>{
        if(e.target.value.length<=30){
            SetTitle(e.target.value)
        }
    }

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

    useEffect(()=>{
        SetTitle("")
        SetIconIndex(0)
    },[openModal])

    const createBoard = async(e)=>{
        e.preventDefault()
        if(title){
            const res = await axios.post(`http://localhost:3000/${id}/newBoard`,
                {title,icon:iconList[iconIndex].name},{withCredentials:true})
                if(res.data==="success"){
                    
                    SetIconIndex(0)
                    SetOpenModal(false)
                    loadData()
                    setTimeout(()=>{

                        SetBoardIndex(user.boards.length)
                    },100)
                }
        }
    }

    return(
        <Modal
        className="modal"
        open={openModal}
        onClose={()=>{
            SetIconIndex(0)
            SetOpenModal(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
            <Box >
                <form 
                onSubmit={createBoard} 
                className="modalForm">

                    <h3 className="m-4">New Board</h3>

                    <label htmlFor="title">Title:</label>
                    
                    <input 
                    required 
                    autoFocus 
                    value={title} 
                    onInput={updateTitle} 
                    type="text" 
                    name="title" 
                    id="title"/>
                    
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
                        color="success"
                        type="submit"
                        style={{textTransform:"none"}}
                        variant="contained"
                        >Create
                        </Button>

                        <Button 
                        style={{textTransform:"none",backgroundColor:"slategray"}}
                        onClick={()=>{
                            SetIconIndex(0)
                            SetOpenModal(false)}}
                            variant="contained"
                        >
                            Cancel
                        </Button>

                    </div>

                </form>
            </Box>
        </Modal> 
    )
}