import { Link } from "react-router-dom"
import "./home.css"
import { Button } from "@mui/material"

export default function Home(){
    return(

        <div id="homeNote">
            <h3 className="my-5">
            With this react app you can create sticky notes to store information
            </h3>
            <div className="d-flex gap-3">

                <Link to="/login">
                    <Button 
                    style={{textTransform:"none",fontSize:"1rem"}}
                    color="primary" 
                    variant="contained">
                        Log in
                    </Button>
                </Link>

                <Link to="/signup">
                    <Button 
                    style={{textTransform:"none",fontSize:"1rem"}}
                    color="success" 
                    variant="contained">
                        Sign up
                    </Button>
                </Link>
            </div>

            <div id="homeFold">
            </div>

        </div>

    )
}