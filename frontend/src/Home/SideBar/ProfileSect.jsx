import { Logout, Settings } from "@mui/icons-material"
import {Button} from "@mui/material"
import { useState } from "react"
import PopoverMenu from "../../PopoverMenu"

export default function ProfileSect(){
    const [open,SetOpen] = useState(false)

    const popoverOptions = {
        open,
        SetOpen,
        anchorEl:document.querySelector("#profileBtn"),
        anchorOrigin:{horizontal:0,vertical:"bottom"},
        content:[
            {icon:<Settings/>,text:"Edit Profile"},
            {icon:<Logout/>,text:"Log Out"}
        ]
    }


    return(
        <>
            <Button id="profileBtn" onClick={()=>{SetOpen(true)
                
            }}>
                <div id="profileDiv">

                    <div id="profileCircle">D</div>
                    <div className="d-flex flex-column justify-content-center">
                        <p>Diego</p>
                        <p>elguito2003@gmail.com</p>
                    </div>
                </div>
            </Button>
            <PopoverMenu options={popoverOptions}/>
        </>
    )
}