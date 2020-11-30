import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './FilmPage.css';
import { fetchFilm } from '../../redux/actions';

const FilmPage = ({ film, fetchFilm, match}) => {

    console.log('match.params.id', match.params.id);
    useEffect(() => {
        fetchFilm(match.params.id);
    }, [fetchFilm, match.params.id]);

    console.log('test: ', film);
    return (
        <div className='film'>
            <p>Title: {film.title}</p>
            <p>Release year: {film.year}</p>
            <p>Format: {film.format}</p>
            <p>Stars: {film.stars?.join(', ')}</p>      
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

