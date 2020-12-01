import React from 'react';
import { connect } from 'react-redux';
import './FilmList.css';
import Film from './Film';
import { deleteFilm } from '../../redux/actions';

const FilmList = ({ films, loader, deleteFilm, order}) => {

    function sortFilms(a, b) {
        const title1 = a.title.toLowerCase();
        const title2 = b.title.toLowerCase();
        if (title1 > title2) {
            return order === 'asc' ? 1 : -1;
        }
        if (title1 < title2) {
            return order === 'asc' ? -1 : 1;
        }
        return 0;
    }

    if(loader){
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    if(!films.length) {
        return (<div className='center'>
            <p className='text-center'>There are no films</p>
                </div>)
    }

    let filmList = films.sort(sortFilms).map( (film) => {
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

const mapStateToProps = state => {
    return {
        loader: state.loader.isLoading
    }

}

const mapDispatchToProps = {
    deleteFilm
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmList);