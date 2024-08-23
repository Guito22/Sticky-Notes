import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Layout(){

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
        
        <Outlet/>
        </>
    )
} 