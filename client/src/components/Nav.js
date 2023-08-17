import { Link, useParams } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { useContext } from "react"

const Nav = ()=> {
    const auth = useContext(AuthContext)
    const user = auth.user

    const params = useParams();
    const ownerId = params.id;

    return (
        <nav>
            {/* always show */}
            <Link className="nav-btn" to='/'>Home</Link>
            {" "}
            <Link className="nav-btn" to='/findsitter'>Find a Sitter</Link>
            {" "}
            <Link className="nav-btn" to='/create_account'>Become a Sitter</Link>
            {" "}
            <Link className="nav-btn" to='/about'>About Us</Link>
            {" "}

            {/* only logged in as an owner */}
            { user && (
                <>
                    <Link className="nav-btn" to={`/managepets`}>Manage Your Pets</Link>
                    {" "}
                    <Link className="nav-btn" to='/manageownervisits'>Manage Your Visits</Link>
                    {" "}
                    <button onClick={auth.logout}>Logout</button>
                </>
            )}

            {/* only logged out */}
            { !user && (
                <>
                    <Link className="nav-btn" to='/login'>Login</Link>
                    {" "}
                    <Link className="nav-btn" to='/create_account'>Create Account</Link>
                </>
            )}
        </nav>
    )
}

export default Nav;