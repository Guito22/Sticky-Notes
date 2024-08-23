import { useState } from "react"
import PlaceHolder from "./PlaceHolder"
import "./board.css"

export default function Board(){
    const [draggedIndex,SetDraggedIndex] = useState(null)
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
        const element = document.querySelector("main").children[index]
        // element.style.width = "90%"
        element.style.transition = "0.2s all ease-in"
        element.classList.remove("h-50","col-md-5")
        element.classList.add("col-11")
        element.style.height = "80vh"
    }
    return(
        <>
            <main>
                {Array(6).fill("").map((i,index)=>{
                    return(
                        <PlaceHolder 
                        index={index} 
                        key={index}
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