import { useState } from "react"
import BoardBtn from "./BoardBtn"
export default function BoardsSect(){
    const [selected,SetSelected] = useState(0)

    return(
        <div id="listsDiv">
            {Array(10).fill("").map((i,index)=>
                
                <BoardBtn 
                key={index}
                index={index}
                selected={selected}
                SetSelected={SetSelected}/>
            )}

        </div>
    )
}