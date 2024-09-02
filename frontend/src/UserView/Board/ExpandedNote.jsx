import { ArrowBack, DeleteOutline, StarOutlineRounded, StarRounded } from "@mui/icons-material"
import { Button, Checkbox, IconButton } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { userContext } from "../Context"

export default function ExpandedNote({note}){
    const {id} = useParams()
    const colors = ["#373737","tomato","blue","orangered","green"]
    const [formData,SetFormData] = useState({
        content:"",
        color:"",
        important:false
    })
    const {loadData,user,boardIndex,expandedIndex,SetExpandedIndex} = useContext(userContext)

    const handleInput = (e)=>{
        const {name,value,checked} = e.target
        if(name==="important"){
            SetFormData({...formData,important:!checked})
        }
        else{
            SetFormData({...formData,[`${name}`]:value})
        }
    }

    const updateNote = async (e)=>{
        e.preventDefault()
        if(formData.content){
            const res = await axios.patch(`http://localhost:3000/${id}/editNote/${note._id}`,
                formData,{withCredentials:true})
            if(res.data==="success"){
                SetExpandedIndex(null)
                loadData()
            }
        }

    }
    const deleteNote = async(e)=>{
        const res = await axios.delete(`http://localhost:3000/${id}/${user.boards[boardIndex]._id}/deleteNote/${note._id}`,
            {withCredentials:true}
        )
        if(res.data==="success"){
            SetExpandedIndex(null)
            loadData()
        }
    }

    useEffect(()=>{
        SetFormData({
            content:note.content,
            color:colors[colors.findIndex(i=>i===note.color)],
            important:note.important
        })
    },[expandedIndex])


    return(
        <form onSubmit={updateNote} 
        className="card col-11" 
        id="expandedNote">

            <IconButton id="returnBtn" onClick={()=>{SetExpandedIndex(null)}}>
                <ArrowBack/>
            </IconButton>
            
            <textarea 
            autoFocus 
            required
            style={{backgroundColor:formData.color,color:"white"}} 
            name="content"
            id="content"
            onInput={handleInput} 
            value={formData.content}>
            </textarea>

            <div className="d-flex">
                {colors.map((i,index)=>{
                    return(
                        <div 
                        onClick={()=>{
                            SetFormData({...formData,color:colors[index]})
                        }}
                        id={i===formData.color ? "selectedColor" : ""}
                        className="colorCircle bg-gradient" 
                        style={{backgroundColor:i,border:`1px solid ${i}`}}>

                        </div>
                    )
                })}
            </div>
            <div className="h-25 d-flex align-items-center justify-content-center">
                
                {note.editionDate!==note.creationDate ? 
                    <p className="m-0">Edited on  
                        {" " + new Date(Date.parse(note.editionDate)).toLocaleString()}
                    </p> :
                    <p className="m-0">Created on  
                        {" " + new Date(Date.parse(note.creationDate)).toLocaleString()}
                    </p>
                }


                <IconButton className="mx-2 my-0">
                    
                    <Checkbox 
                    name="important"
                    id="important"
                    checked={formData.important}
                    onInput={handleInput}
                    checkedIcon={<StarRounded className="star"/>} 
                    icon={<StarOutlineRounded className="star"/>}
                    />

                    
                </IconButton>
                <IconButton onClick={deleteNote} className="mx-2 my-0">
                    <DeleteOutline color="error" style={{fontSize:"2rem"}}/>
                </IconButton>
            </div>
            <Button type="submit" color="secondary" variant="contained">
                Save
            </Button>
        </form>
    )
}