import {CopyAllRounded, StarOutlineRounded, StarRounded} from "@mui/icons-material"
import { IconButton } from "@mui/material"

export default function Note({index,info,dragStartFunction,dragEndFunction,dropFunction,clickFunction}){

    return(
        <div 
        onDragStart={()=>{dragStartFunction(index)}}
        onDragEnd={dragEndFunction} 
        onDragOver={(e)=>e.preventDefault()}
        onDrop={()=>{dropFunction(index)}}
        style={{backgroundColor:info.color,color:"white"}}
        className="card col-10 col-md-5 h-50 d-flex flex-column" 
        aria-hidden="true" 
        draggable="true"
        >
            <h4 onClick={()=>{clickFunction(index)}} className="p-4 h-75" style={{overflow:"hidden"}}>
                {info.content}
            </h4>
            <div className="h-25 d-flex align-items-center justify-content-end">
                <IconButton
                 className="m-2">
                    <CopyAllRounded style={{color:"gray",fontSize:"2rem"}}/>
                </IconButton>
                    <IconButton className="m-2">
                {info.important ?
                        <StarRounded style={{color:"goldenrod",fontSize:"2rem"}}/>:
                        <StarOutlineRounded style={{color:"goldenrod",fontSize:"2rem"}}/>
                }
                    </IconButton>
            </div>
        </div>
    )
}