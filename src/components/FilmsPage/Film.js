import './FilmList.css'
import React from 'react';
import { NavLink } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

function Film({handleDelete, film}){

    function handleDeleteFilm(e) {
        e.preventDefault()

        handleDelete(film._id)
    }

    return (
        <NavLink
            className='film'
            exact
            to={`/about/${film._id}`}
        >
            <Button
                color='secondary'
                className='deleteIcon'
                onClick={handleDeleteFilm}
            >
                <DeleteIcon />
            </Button>
            <div className='nameWrapper'>
                <div
                    className='film-title'
                >
                    {film.title}
                </div>
                <div className='film-year'>
                    {film.year}
                </div>
            </div>     
        </NavLink>
    )
}

export default Film