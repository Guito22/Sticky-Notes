import { useContext, useEffect, useState } from "react"
import Note from "./Note"
import "./board.css"
import ExpandedNote from "./ExpandedNote"
import { AddCircle } from "@mui/icons-material"
import { userContext } from "../Context"
import { IconButton } from "@mui/material"

export default function Board(){
    const [draggedIndex,SetDraggedIndex] = useState(null)
    const {user,boardIndex,SetOpenNoteModal,expandedIndex,SetExpandedIndex} = useContext(userContext)
    const dragStartFunction = (index)=>{
        SetDraggedIndex(index)
    }
    const dragEndFunction = ()=>{
        SetDraggedIndex(null)

    }
    const dropFunction = (index)=>{
        const children = document.querySelector("main").children
        const aux = children[draggedIndex].innerHTML
        children[draggedIndex].innerHTML = children[index].innerHTML
        children[index].innerHTML = aux

    }
    const clickFunction = (index)=>{

        SetExpandedIndex(index)
    }
    //to reset expanded view everytime a board is selected
    useEffect(()=>{
        SetExpandedIndex(null)
        SetDraggedIndex(null)
    },[boardIndex])

    return(
        <>
            <main id="board">
                { expandedIndex!==null ? 
                    <ExpandedNote 
                    note={user.boards[boardIndex].notes[expandedIndex]}
                    expandedIndex={expandedIndex}
                    SetExpandedIndex={SetExpandedIndex}/>    
                    :          
                    user.boards && user.boards[boardIndex].notes.map((i,index)=>{
                        
                        return(
                            <Note
                            index={index} 
                            key={index}
                            note={i}
                            dragStartFunction={dragStartFunction}
                            dragEndFunction={dragEndFunction}
                            dropFunction={dropFunction}
                            clickFunction={clickFunction}
                            />
                        )
                    })
                    
                }
                {/* if the board has no notes this is displayed */}
                {user.boards && user.boards[boardIndex].notes.length===0
                    && <div id="addNoteDiv" className="d-flex flex-column align-items-center justify-content-center">
                        <h1>Create a note</h1>
                        <IconButton
                        onClick={()=>{
                            SetOpenNoteModal(true)
                        }}>
                            <AddCircle id="addCircle"/>
                        </IconButton>
                    </div>
                }   
                
            </main>
        </>
    )
}