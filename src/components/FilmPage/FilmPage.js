import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './FilmPage.css';
import NavBar from '../NavBar/NavBar';
import { fetchFilm } from '../../redux/actions';

const FilmPage = ({ film, loader, fetchFilm, match}) => {

    useEffect(() => {
        fetchFilm(match.params.id);
    }, [fetchFilm, match.params.id]);


    if(loader){
        return (
            <div>
                <NavBar/>
                <div className="loader">
                    <div className="lds-dual-ring"></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar/>
            <div className='film-info'>
            <p>Title: {film.title}</p>
            <p>Release year: {film.year}</p>
            <p>Format: {film.format}</p>
            <p>Stars: {film.stars?.join(', ')}</p>      
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    film: state.film,
    loader: state.loader.isLoading
})

const mapDispatchToProps = {
    fetchFilm
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);

