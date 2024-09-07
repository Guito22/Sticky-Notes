import { Button } from "@mui/material"
import "./sideBar.css"
import ProfileSect from "./ProfileSect"
import ThemeSect from "./ThemeSect"
import BoardsSect from "./BoardsSect"
import BoardModalForm from "./BoardModalForm"
import { useContext } from "react"
import { userContext } from "../Context"

export default function SideBar(){
    const {openBoardModal,SetOpenBoardModal} = useContext(userContext)

    return(
        <aside 
        id="sideBar" 
        className="offcanvas-lg offcanvas-start" 
        tabIndex="-1">
            
            <ProfileSect/>
            
            <Button id="addListBtn"
            data-bs-dismiss="offcanvas" 
            data-bs-target="#sideBar"
            onClick={()=>{
                SetOpenBoardModal(true)
            }}>
                + Add Board
            </Button>

            <BoardModalForm 
            openModal={openBoardModal} 
            SetOpenModal={SetOpenBoardModal}/>

            <BoardsSect/>

            <ThemeSect/>

        </aside>
    )
}