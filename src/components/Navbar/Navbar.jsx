import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="crud">
                        <Link className="link" to="/">CRUD</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/celulares">Celulares</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/juegos">Juegos</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar