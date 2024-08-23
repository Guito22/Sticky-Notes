import { useState } from "react"
import ListBtn from "./ListBtn"
export default function ListsSect(){
    const [selected,SetSelected] = useState(0)

    return(
        <div id="listsDiv">
            {Array(10).fill("").map((i,index)=>
                
                <ListBtn 
                key={index}
                index={index}
                selected={selected}
                SetSelected={SetSelected}/>
            )}

        </div>
    )
}