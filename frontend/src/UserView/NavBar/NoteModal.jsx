import { Modal,Box, Checkbox, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import { userContext } from "../Context";

export default function NoteModal(){
    const {id} = useParams()
    const {user,boardIndex,loadData,openNoteModal,SetOpenNoteModal} = useContext(userContext)
    const [colorIndex,SetColorIndex] = useState(0)
    const colors = ["#373737","tomato","blue","orangered","green"]
    const [formData,SetFormData] = useState({
        content:"",
        color:colors[colorIndex],
        important:false
    })
    const handleInput = (e)=>{
        const {name,value,checked} = e.target
        if(name==="important"){
            SetFormData({...formData,[`${name}`]:!checked})

        }
        else{

            SetFormData({...formData,[`${name}`]:value})
        }
    }

    const createNote = async(e)=>{
        e.preventDefault()
        if(formData.content && user.boards){
            const res = await axios.post(`http://localhost:3000/${id}/${user.boards[boardIndex]._id}/newNote`,
                formData,{withCredentials:true})

            if(res.data==="success"){
                loadData()
                SetOpenNoteModal(false)
            }
            
        }
    }
    useEffect(()=>{
        SetFormData({
            content:"",
            color:colors[0],
            important:false
        })
        SetColorIndex(0)
    },[openNoteModal])

    return(
        <Modal
        className="modal"
        open={openNoteModal}
        onClose={()=>{SetOpenNoteModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
            <Box>
                <form 
                onSubmit={createNote} 
                className="modalForm">

                    <h3 className="m-2">
                        <label htmlFor="contentNote">New Note: </label>
                    </h3>

                    <textarea 
                    style={{backgroundColor:colors[colorIndex]}}
                    name="content"
                    required
                    autoFocus
                    onInput={handleInput} 
                    value={formData.content}
                    placeholder="Write your note..." 
                    id="contentNote"/>

                    <div className="d-flex">
                        {colors.map((i,index)=>{
                            return(
                                <div 
                                key={index}
                                onClick={()=>{
                                    SetFormData({...formData,color:colors[index]})
                                    SetColorIndex(index)
                                }}
                                id={colorIndex===index ? "selectedColor" : ""}
                                className="colorCircle bg-gradient" 
                                style={{backgroundColor:i,border:`1px solid ${i}`}}>

                                </div>
                            )
                        })}
                    </div>

                    <div className="d-flex align-items-center">
                        <Checkbox 
                        name="important" 
                        className="m-1" 
                        onInput={handleInput}
                        checked={formData.important}
                        id="important"/>
                        <label htmlFor="important">Important</label>
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
                        onClick={()=>SetOpenNoteModal(false)}
                        variant="contained"
                        >Cancel
                        </Button>
                    </div>

                </form>
            </Box>
        </Modal>  
    )
}