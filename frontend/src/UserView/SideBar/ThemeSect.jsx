import { DarkMode, LightMode} from "@mui/icons-material"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function ThemeSect(){
    const {id} = useParams()

    const changeTheme = async()=>{
        const res = await axios.patch(`http://localhost:3000/${id}/toggleTheme`,{},{withCredentials:true})
        
        if(res.data==="light" || res.data==="dark"){

            const theme = res.data
            const circle = document.querySelector("#circle")
            if(theme){
                document.body.setAttribute("data-theme",theme)
                if(theme==="dark"){
                    circle.style.transform = "translateX(2rem)"
                }
                else{
                    circle.style.transform = "none"
                    
                }
            }
            
        }
    }

    return(

        <div id="themeBtnDiv">

            <LightMode/>

            <button id="themeBtn" onClick={changeTheme}>
                <div id="circle"></div>
            </button>

            <DarkMode/>
        </div>

    )
}