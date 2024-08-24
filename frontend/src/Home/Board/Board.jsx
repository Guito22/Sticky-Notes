import { useState } from "react"
import Note from "./Note"
import "./board.css"
import ExpandedNote from "./ExpandedNote"
import {notes} from "./notes"
import { ArrowBack, ArrowBackSharp } from "@mui/icons-material"

export default function Board(){
    const [draggedIndex,SetDraggedIndex] = useState(null)
    const [expandedIndex,SetExpandedIndex] = useState(null)
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
    return(
        <>
            <main>
                {expandedIndex!==null ? 
                    <ExpandedNote 
                    info={notes[expandedIndex]}
                    SetExpandedIndex={SetExpandedIndex}/>    
                    :          
                    notes.map((i,index)=>{
                        
                        return(
                            <Note
                            index={index} 
                            key={index}
                            info={i}
                            dragStartFunction={dragStartFunction}
                            dragEndFunction={dragEndFunction}
                            dropFunction={dropFunction}
                            clickFunction={clickFunction}
                            />
                        )
                    })}
                
            </main>
        </>
    )
}