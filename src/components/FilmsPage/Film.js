import './FilmList.css'
import React from 'react';
import { NavLink } from "react-router-dom";

function Film(props){
    return (
        <NavLink className='film' exact to={`/films/${props.film._id}`}>
            <div className='film-title' onClick={() => {props.handleDelete(props.film._id)}}>{props.film.title}</div>
            <div className='film-year'>{props.film.year}</div>      
        </NavLink>
    )
}

export default Film