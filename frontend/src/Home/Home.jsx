import { Link } from "react-router-dom"
import "./home.css"

export default function Home(){
    return(

        <div id="homeNote">
            <h3 className="my-5">
            With this react app you can create sticky notes to store information
            </h3>
            <div className="d-flex gap-3">

                <Link to="/login" className="btn btn-primary">Log in</Link>
                <Link className="btn btn-success">Sign Up</Link>
            </div>

            <div id="homeFold">
            </div>

        </div>

    )
}