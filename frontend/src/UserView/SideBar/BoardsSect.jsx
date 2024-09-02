import { useContext, useState } from "react"
import BoardBtn from "./BoardBtn"
import {userContext} from "../Context"
import { Book, CalendarMonth, Home, Lightbulb, RocketLaunch } from "@mui/icons-material"
import axios from "axios"
import { useParams } from "react-router-dom"
export default function BoardsSect(){
    const {id} = useParams()
    const {user,loadData} = useContext(userContext)
    const [draggedIndex,SetDraggedIndex] = useState(null)
    const dragStartFunction = (index)=>{
        SetDraggedIndex(index)
    }
    const dragEndFunction = ()=>{
        SetDraggedIndex(null)

    }
    const dropFunction = async (index)=>{
        const res = await axios.patch(`http://localhost:3000/${id}/${draggedIndex}/${index}`,
            {},{withCredentials:true}
        )
        if(res.data=="success"){
            loadData()
        }

    }
    const iconList = [
        {
            name:"home",
            icon:<Book style={{color:"cyan",margin:"1rem"}}/>
        },
        {
            name:"lightbulb",
            icon:<Lightbulb style={{color:"yellow",margin:"1rem"}}/>,
        },
        {
            name:"home",
            icon:<Home style={{color:"darkblue",margin:"1rem"}}/>
        },
        {
            name:"rocket",
            icon:<RocketLaunch style={{color:"orange",margin:"1rem"}}/>,
        },
        {
            name:"calendar",
            icon:<CalendarMonth style={{color:"salmon",margin:"1rem"}}/>
        }
    ]
    return(
        <div id="listsDiv">
            {user.boards && user.boards.length>0 && user.boards.map((i,index)=>
                
                <BoardBtn 
                key={index}        
                index={index}
                icon={iconList.find(j=>j.name===i.icon)}
                dragStartFunction={dragStartFunction}
                dragEndFunction={dragEndFunction}
                dropFunction={dropFunction}
                />
            )}

        </div>
    )
}