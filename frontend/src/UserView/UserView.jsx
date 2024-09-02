import axios from "axios"
import Board from "./Board/Board"
import NavBar from "./NavBar/NavBar"
import SideBar from "./SideBar/SideBar"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { userContext } from "./Context"

import EditBoardModal from "./EditBoardModal"
const sectionStyle = {
    display:"flex",
    flexDirection:"column",
    flex:"12",
    height:"100vh"
}
export default function UserView(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [user,SetUser] = useState({})
    const [boardIndex,SetBoardIndex] = useState(0)
    const [expandedIndex,SetExpandedIndex] = useState(null)
    const [openBoardModal,SetOpenBoardModal] = useState(false)
    const [openEditModal,SetOpenEditModal] = useState(false)
    const [openNoteModal,SetOpenNoteModal] = useState(false)
    const [load,SetLoad] = useState(false)
    const loadData = ()=>{
        SetLoad(!load)
    }

    const contextValues = {
        user,loadData,
        boardIndex,SetBoardIndex,
        openBoardModal,SetOpenBoardModal,
        openEditModal,SetOpenEditModal,
        openNoteModal,SetOpenNoteModal,
        expandedIndex,SetExpandedIndex,
    }

    const getUser = async()=>{
        const res = (await axios.get(`http://localhost:3000/${id}`,{withCredentials:true})).data
        if(res==="not logged"){
            navigate("/")
        }
        else{
            SetUser(res)
            const circle = document.querySelector("#circle")
            if(res.theme==="dark"){
                    circle.style.transform = "translateX(2rem)"
            }
            
            document.body.setAttribute("data-theme",res.theme)

        }
    }


    useEffect(()=>{
        getUser()
    },[load])


    return(
        <userContext.Provider value={contextValues}>
        
            <SideBar/>
            <section style={sectionStyle}>
                <NavBar/>
                <Board/>
            </section>
            <EditBoardModal/>
        </userContext.Provider>
    )
}