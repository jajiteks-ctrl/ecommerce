import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "./Navbar.css";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";


const Navbar = ({ displayUser }) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"))
    const { mode, toogleTheme } = useTheme()

    const handleLogout = ()=>{
        localStorage.removeItem("user")
        navigate("/login")

    }




    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">MyApp</Link>
            </div>

            <div
                className={`nav-links ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
            >
                <Link to="/">Home</Link>

                {user ? (<>
                    <Link to="/product">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    {displayUser && (
                        <span className="user">
                            <IoPersonCircleOutline size={22} />
                            {displayUser.username}
                        </span>
                    )}
                    <button onClick = {handleLogout}>Logout</button>
                </>) : (<> <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>)}









                <button onClick={toogleTheme}>
                    {mode}
                </button>



            </div>

            <div
                className="menu-icon"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;