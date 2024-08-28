import Board from "./Board/Board"
import NavBar from "./NavBar/NavBar"
import SideBar from "./SideBar/SideBar"
import { useEffect } from "react"
const sectionStyle = {
    display:"flex",
    flexDirection:"column",
    flex:"12",
    height:"100vh"
}
export default function UserView(){
    useEffect(()=>{
        const theme = localStorage.getItem("data-theme")
        const circle = document.querySelector("#circle")
        if(theme==="dark"){
                circle.style.transform = "translateX(2rem)"
        }
        
        document.body.setAttribute("data-theme",
            theme ? theme : "light")
        localStorage.setItem("data-theme",
            document.body.getAttribute("data-theme"))
    },[])
    return(
        <>
        
            <SideBar/>
            <section style={sectionStyle}>
            <NavBar/>
                <Board/>
            </section>
            
        </>
    )
}