/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from "js-cookie";
function NavBar(){

    const logout = () => {
        Cookies.remove('token');
    }

    return(
        <React.Fragment>
            <div className="navbar navbar-expand bg-primary mb-5">
                <div className="container">
                    <a className="navbar-brand text-light" href="#">NavBar</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link text-light" href="#">Home</a></li>
                            <li className="nav-item">
                                <a className="nav-link text-light" onClickCapture={logout} href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default NavBar