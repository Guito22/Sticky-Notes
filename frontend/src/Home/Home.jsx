import Board from "./Board/Board"
import NavBar from "./NavBar/NavBar"
import SideBar from "./SideBar/SideBar"

const sectionStyle = {
    display:"flex",
    flexDirection:"column",
    flex:"12",
    height:"100vh"
}
export default function Home(){

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