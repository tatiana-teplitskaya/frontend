import React from 'react';
import { connect } from 'react-redux';
import './FilmList.css';
import Film from './Film';
import { deleteFilm } from '../../redux/actions';

const FilmList = ({ films, deleteFilm }) => {

    if(!films.length) {
        return <p className='text-center'>There are no films yet</p>
    }

    let filmList = films.map( (film) => {
        return (

            <Film key={film._id} film={film} handleDelete={deleteFilm}/>
            
        )
    });

    return(

        <div className='filmList'>
            {filmList}
        </div>
        
    )
}

const mapDispatchToProps = {
    deleteFilm
}

export default connect(null, mapDispatchToProps)(FilmList);