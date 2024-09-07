import { IconButton,Button} from "@mui/material";
import { Delete, DeleteOutlineOutlined, Edit, EditNoteOutlined, EditOutlined, MoreHoriz} from "@mui/icons-material";
import { useContext, useState } from "react";
import NoteModal from "./NoteModal";
import PopoverMenu from "../../PopoverMenu"
import "./navBar.css"
import { userContext } from "../Context";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NavBar(){
  const {id} = useParams()
  const [openMenu,SetOpenMenu] = useState(false)
  const {user,boardIndex,SetBoardIndex,SetOpenEditModal,loadData,SetOpenNoteModal,expandedIndex,SetExpandedIndex} = useContext(userContext)
  const popoverOptions = {
    open:openMenu,
    SetOpen:SetOpenMenu,
    anchorEl:document.querySelector("#moreBtn"),
    anchorOrigin:{horizontal:"left",vertical:"top"},
    content:[
      {
        icon:<EditNoteOutlined/>,
        text:"Edit Board",
        action:()=>{
          SetOpenEditModal(true)
          SetOpenMenu(false)

        }
      },
      {
        icon:<DeleteOutlineOutlined/>, 
        text:"Delete Board",
        action: async()=>{
          const res = await axios.delete(`http://localhost:3000/${id}/deleteBoard/${user.boards[boardIndex]._id}`,{withCredentials:true})
          if(res.data==="success"){
              if(boardIndex===(user.boards.length)-1){
                SetBoardIndex(boardIndex-1)
              }
              loadData()
              SetExpandedIndex(null)
              SetOpenMenu(false)
          }
      }
      }
    ]

  }
    return (
        <nav id="boardNav">

          <div className="navbar d-lg-none m-3">
            <button className="navbar-toggler" id="toggleBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideBar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* if there are no boards this won't be displayed */}
          {user.boards && expandedIndex==null && boardIndex!=null && user.boards.length!==0 &&
            <>
              <h2 id="navTitle">{user.boards && user.boards[boardIndex].title}</h2>
              
              <Button 
              id="addBtn" 
              onClick={()=>SetOpenNoteModal(true)}>
                + Add Note
              </Button>

              <IconButton 
              id="moreBtn" 
              onClick={()=>SetOpenMenu(true)}>
                  <MoreHoriz/>
              </IconButton>

              <NoteModal/>

              <PopoverMenu options={popoverOptions}/>

            </>
          }

        </nav>
    )
}