import { ArrowBack, CopyAllRounded, KeyboardReturn, NavigationRounded, StarOutlineRounded, StarRounded } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react"

export default function ExpandedNote({SetExpandedIndex,info}){
    const colors = ["#373737","tomato","blue","orange","green"]
    const [colorIndex,SetColorIndex] = useState(colors.indexOf(info.color))
    return(
        <div className="card col-11" id="expandedNote">
            <IconButton id="returnBtn" onClick={()=>{SetExpandedIndex(null)}}>
                <ArrowBack/>
            </IconButton>
            
            <textarea autoFocus style={{backgroundColor:info.color,color:"white"}} name="" id="" value={info.content}></textarea>
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
            <div className="h-25 d-flex align-items-center justify-content-center">
                <p>Created on {info.date}</p>
                <IconButton
                 className="m-3">
                    <CopyAllRounded style={{color:"gray",fontSize:"2rem"}}/>
                </IconButton>
                    <IconButton className="m-3">
                    {info.important ?
                        <StarRounded className="star"/>:
                        <StarOutlineRounded className="star"/>
                    }
                    </IconButton>
            </div>
        </div>
    )
}