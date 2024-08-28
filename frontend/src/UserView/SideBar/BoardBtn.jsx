import { Delete, Edit, ListAlt} from "@mui/icons-material"
import { useState } from "react"
import PopoverMenu from "../../PopoverMenu"

export default function BoardBtn({index,selected,SetSelected}){
    const [open,SetOpen] = useState(false)
    const popoverOptions = {
        open,
        SetOpen,
        anchorEl:document.querySelectorAll(".listBtn")[index],
        anchorOrigin:{horizontal:0,vertical:"bottom"},
        content:[
            {icon:<Edit/>,text:"Edit Board"},
            {icon:<Delete/>,text:"Delete Board"}

        ]
    }

    return(
        <>
            <div
            id={selected===index ? "selected" : ""}
            className="listBtn"
            onContextMenu={(e)=>{
                e.preventDefault()
                SetOpen(true)}}
            onClick={()=>{SetSelected(index)}}>
                
                <ListAlt style={{margin:"1rem"}}/>
                <p>Board Number {index+1}</p>
            </div>
            <PopoverMenu options={popoverOptions}/>
        </>
    )
}