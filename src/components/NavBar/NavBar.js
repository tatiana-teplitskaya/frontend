import React from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css';


function NavBar(){

    return(
        <div className="nav">
            
            <ul>
                <li>
                    <NavLink className='link' activeClassName='active-link' exact to="/">Movies</NavLink>
                </li>
                <li>
                    <NavLink className='link' activeClassName='active-link' exact to="/new-film">Create movie</NavLink>
                </li>
            </ul>

        </div>
    )

}

export default NavBar;