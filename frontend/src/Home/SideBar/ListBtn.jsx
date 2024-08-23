import { Delete, Edit, ListAlt} from "@mui/icons-material"
import { useState } from "react"
import PopoverMenu from "../../PopoverMenu"

export default function ListBtn({index,selected,SetSelected}){
    const [open,SetOpen] = useState(false)
    const popoverOptions = {
        open,
        SetOpen,
        anchorEl:document.querySelectorAll(".listBtn")[index],
        anchorOrigin:{horizontal:0,vertical:"bottom"},
        content:[
            {icon:<Edit/>,text:"Edit List"},
            {icon:<Delete/>,text:"Delete List"}

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
                <p>List Number {index+1}</p>
            </div>
            <PopoverMenu options={popoverOptions}/>
        </>
    )
}