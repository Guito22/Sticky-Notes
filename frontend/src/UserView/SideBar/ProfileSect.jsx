import { Logout, Settings } from "@mui/icons-material"
import {Button} from "@mui/material"
import { useContext, useState } from "react"
import PopoverMenu from "../../PopoverMenu"
import { userContext } from "../Context"
import { useNavigate } from "react-router-dom"
import axios from "axios";

export default function ProfileSect(){
    const navigate = useNavigate()
    const [open,SetOpen] = useState(false)
    const {user} = useContext(userContext)

    const popoverOptions = {
        open,
        SetOpen,
        anchorEl:document.querySelector("#profileBtn"),
        anchorOrigin:{horizontal:0,vertical:"bottom"},
        content:[
            {
                icon:<Settings/>,
                text:"Edit Profile",
                action:()=>{
                    navigate(`/edit/${user._id}`)
                }
            },
            {
                icon:<Logout/>,
                text:"Log Out",
                action:async ()=>{
                    await axios.post(`http://localhost:3000/${user._id}/logout`)
                    navigate("/")
                }
            }
        ]
    }


    return(
        <>
            <Button id="profileBtn" onClick={()=>{SetOpen(true)
                
            }}>
                <div id="profileDiv">

                    <div 
                    id="profileCircle" 
                    style={{backgroundColor:user.color}}>

                        {user.name && user.name.toUpperCase()[0]}

                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <p>{ user.name}</p>
                        <p>{ user.email}</p>
                    </div>
                </div>
            </Button>
            <PopoverMenu options={popoverOptions}/>
        </>
    )
}