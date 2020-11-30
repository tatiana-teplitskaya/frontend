import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './FilmPage.css';
import { fetchFilm } from '../../redux/actions';

const FilmPage = ({ film, fetchFilm, match}) => {
    useEffect(() => {
        fetchFilm(match.params.id);
    }, [fetchFilm, match.params.id]);

    console.log(film);
    return (
        <div className='film'>
            <p>{film.title}</p>
            <p>{film.year}</p>
            <p>{film.format}</p>
            <p>{film.stars.join(', ')}</p>      
            {/* <div>{props.film.format}</div> 
            <div>{props.film.actors.join(', ')}</div>      */}
        </div>
    )
}

const mapStateToProps = state => ({
    film: state.film
})

const mapDispatchToProps = {
    fetchFilm
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);

