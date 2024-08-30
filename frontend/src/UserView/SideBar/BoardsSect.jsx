import { useContext, useState } from "react"
import BoardBtn from "./BoardBtn"
import {userContext} from "../Context"
import { Book, CalendarMonth, Home, Lightbulb, RocketLaunch } from "@mui/icons-material"
export default function BoardsSect(){
    const {user} = useContext(userContext)
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
            {user.boards && user.boards.map((i,index)=>
                
                <BoardBtn 
                key={index}        
                index={index}
                icon={iconList.find(j=>j.name===i.icon)}
                />
            )}

        </div>
    )
}