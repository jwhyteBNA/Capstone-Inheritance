import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const LeaderNavBar = () => {
    const navigate = useNavigate()
 
    return (
        <ul className="navbar">
            <li className="navbar__item"> 
                <Link className="navbar_home" to="/">Home</Link>
            </li>
            <li className="navbar__item"> 
                <Link className="navbar_treasures" to="/treasure">Treasures</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar_requests" to="/requests">Requests</Link>
             </li>
             <li className="navbar__item">
                <Link className="navbar_profile" to="/profile">Profile</Link>
             </li>
           <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("family_user")
                    navigate("/", {replace: true})
                }}>Leader Logout</Link>
            </li>
        </ul>
    )
}