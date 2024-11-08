import { Delete, DeleteOutlineOutlined, Edit, EditNoteOutlined, ListAlt} from "@mui/icons-material"
import { useContext, useState } from "react"
import PopoverMenu from "../../PopoverMenu"
import axios from "axios"
import { userContext } from "../Context"
import { useParams } from "react-router-dom"

export default function BoardBtn({index,icon,dragStartFunction,dragEndFunction,dropFunction}){
    const {id} = useParams()
    const [open,SetOpen] = useState(false)
    const {user,loadData,boardIndex,SetBoardIndex,SetOpenEditModal,SetExpandedIndex} = useContext(userContext)
    const popoverOptions = {
        open,
        SetOpen,
        anchorEl:document.querySelectorAll(".listBtn")[index],
        anchorOrigin:{horizontal:0,vertical:"bottom"},
        content:[
            {
                icon:<EditNoteOutlined/>,
                text:"Edit Board",
                action:()=>{
                    SetOpenEditModal(true)
                    SetBoardIndex(index)
                    SetOpen(false)
                }
            },
            {
                icon:<DeleteOutlineOutlined/>,
                text:"Delete Board",
                action: async()=>{
                    const res = await axios.delete(`http://localhost:3000/${id}/deleteBoard/${user.boards[index]._id}`,{withCredentials:true})
                    
                    if(res.data==="success"){
                        if(index===(user.boards.length-1)){
                            SetBoardIndex(index-1)
                        }
                        if(user.boards.length-1==0){
                            SetBoardIndex(null)
                        }
                        
                        loadData()
                        SetExpandedIndex(null)
                        
                    }
                }
            }

        ]
    }

    return(
        <>
            <div
            id={boardIndex===index ? "selected" : ""}
            className="listBtn"
            draggable
            onDragStart={()=>{dragStartFunction(index)}}
            onDragEnd={dragEndFunction} 
            onDragOver={(e)=>e.preventDefault()}
            onDrop={()=>{dropFunction(index)}}
            onContextMenu={(e)=>{
                e.preventDefault()
                SetOpen(true)}
            }
            onClick={()=>{
                loadData()
                SetBoardIndex(index)}
            }>
            
                {icon.icon}
                <p>{user.boards && user.boards[index].title}</p>

            </div>
            <PopoverMenu options={popoverOptions}/>
        </>
    )
}