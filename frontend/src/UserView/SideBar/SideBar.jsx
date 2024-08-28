import { Button } from "@mui/material"
import "./sideBar.css"
import ProfileSect from "./ProfileSect"
import ThemeSect from "./ThemeSect"
import BoardsSect from "./BoardsSect"
import BoardModalForm from "./BoardModalForm"
import { useState } from "react"
export default function SideBar(){
    const [openModal,SetOpenModal] = useState(false)

    return(
        <aside id="sideBar" className="offcanvas-lg offcanvas-start" tabindex="-1">
            <ProfileSect/>

            <Button id="addListBtn" 
            onClick={()=>SetOpenModal(true)}>
                + Add Board
            </Button>
            <BoardModalForm openModal={openModal} SetOpenModal={SetOpenModal}/>

            <BoardsSect/>

            <ThemeSect/>

        </aside>
    )
}