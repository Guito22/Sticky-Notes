import {CopyAllRounded, StarOutlineRounded, StarRounded} from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import axios from "axios"
import { useContext, useState } from "react"
import { userContext } from "../Context"
import { useParams } from "react-router-dom"

export default function Note({index,note,dragStartFunction,dragEndFunction,dropFunction,clickFunction}){
    const {id} = useParams()
    const colors = ["#373737","tomato","blue","orangered","green"]
    const colorIndex = colors.indexOf(note.color)
    const foldColors = ["#252525","rgb(247, 84, 55)","navy","darkred","darkgreen"]
    const {loadData} = useContext(userContext)

    const toggleImportant = async(e)=>{
        const res = await axios.patch(`http://localhost:3000/${id}/editNote/${note._id}`,
            {important:!e.target.checked},{withCredentials:true})
        if(res.data==="success"){
            loadData()
        }
    }
    return(
        <div 
        onDragStart={()=>{dragStartFunction(index)}}
        onDragEnd={dragEndFunction} 
        onDragOver={(e)=>e.preventDefault()}
        onDrop={()=>{dropFunction(index)}}
        style={{backgroundColor:note.color,color:"white"}}
        className="card col-10 col-md-5 h-50 d-flex flex-column" 
        aria-hidden="true" 
        draggable="true"
        >
            <h4 onClick={()=>{clickFunction(index)}} className="p-4 h-75" style={{overflow:"hidden"}}>
                {note.content}
            </h4>
            <div className="h-25 d-flex align-items-center justify-content-start">
                <IconButton
                 className="m-2">
                    <CopyAllRounded style={{color:"gray",fontSize:"2rem"}}/>
                </IconButton>
                <Checkbox className="m-2"
                    name="important"
                    id="important"
                    onInput={toggleImportant}
                    checked={note.important}
                    checkedIcon={<StarRounded className="star"/>} 
                    icon={<StarOutlineRounded className="star"/>}
                    />
            </div>
            <div 
            onClick={()=>{clickFunction(index)}}
            className="fold"
            style={{
                borderLeftColor:foldColors[colorIndex],
                borderTopColor:foldColors[colorIndex],
            }}
            >

            </div>
        </div>
    )
}