import { DarkMode, LightMode} from "@mui/icons-material"
export default function ThemeSect(){
    const changeTheme = ()=>{
        const theme = localStorage.getItem("data-theme")
        const circle = document.querySelector("#circle")
        if(theme){
            localStorage.setItem("data-theme",theme==="dark" ? "light": "dark")
            document.body.setAttribute("data-theme",theme==="dark" ? "light": "dark")
            if(theme==="light"){
                circle.style.transform = "translateX(2rem)"
            }
            else{
                circle.style.transform = "none"

            }
        }
        else{
            localStorage.setItem("data-theme","light")
            document.body.setAttribute("data-theme","light")

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