import { IconButton,Button} from "@mui/material";
import {Brush, Delete, MoreHoriz} from "@mui/icons-material";
import { useState } from "react";
import NoteModal from "./NoteModal";
import PopoverMenu from "../../PopoverMenu"
import "./navBar.css"

export default function NavBar(){
  const [open,SetOpen] = useState(false)
  const [openMenu,SetOpenMenu] = useState(false)
  const popoverOptions = {
    open:openMenu,
    SetOpen:SetOpenMenu,
    anchorEl:document.querySelector("#moreBtn"),
    anchorOrigin:{horizontal:"left",vertical:"top"},
    content:[
      {icon:<Brush/>,text:"Change color"},
      {icon:<Delete/>, text:"Delete List"}
    ]

  }
    return (
        <nav id="homeNav">
          <div className="navbar d-lg-none m-3">
            <button className="navbar-toggler" id="toggleBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideBar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <h2>Some Title</h2>
          
          <Button id="addBtn" onClick={()=>{SetOpen(true)}}>+ Add Note</Button>
          <IconButton id="moreBtn" onClick={()=>{SetOpenMenu(true)}}>
              <MoreHoriz/>
          </IconButton>
          <NoteModal open={open} SetOpen={SetOpen}/>
          <PopoverMenu options={popoverOptions}/>

        </nav>
    )
}