import {Outlet} from "react-router-dom"
import "./layout.css"

export default function Layout(){

    return(
        <main id="homeMain">
            <nav id="homeNav">
                <h1>Sticky Notes</h1>
            </nav>
            <section id="homeSection">
                <Outlet/>

            </section>
        </main>
    )
}