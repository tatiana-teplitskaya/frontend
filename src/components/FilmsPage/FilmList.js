import React from 'react';
import { connect } from 'react-redux';
import './FilmList.css';
import Film from './Film';
import { deleteFilm, setCurrentPage, setCurrentSearchPage, searchFilms, fetchFilms } from '../../redux/actions';

const FilmList = ({ films, pageSize, totalFilmsCount, currentPage, loader, deleteFilm, setCurrentPage, setCurrentSearchPage, order, isSearched, searchFilms, searchTitle, searchStar}) => {

    function sortFilms(a, b) {
        const title1 = a.title?.toLowerCase();
        const title2 = b.title?.toLowerCase();
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

            <Film key={film._id} film={film} handleDelete={deleteFilm} fetchFilms={fetchFilms} currentPage={currentPage} pageSize={pageSize}/>
            
        )
    });

    const onPageClickHandle = (p) => {
        if (isSearched){
            setCurrentSearchPage(p);
            searchFilms({ title: searchTitle, star: searchStar, currentSearchPage: p, pageSize })
        } else {
            setCurrentPage(p);
        }
    }


    let pagesCount = Math.ceil(totalFilmsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    return(
    <div>
        <div className='filmList'>
            {filmList}
        </div>
        <div className='pages'>
            {pages.map( p => {
                return <span className={currentPage === p ? 'selectedPage' : undefined}
                        onClick = {() => { onPageClickHandle(p);
                        console.log(p) }} >{p}</span>
            })
            }
        </div>
    </div>  
    )
}

const mapStateToProps = state => {
    return {
        loader: state.loader.isLoading,
        searchTitle: state.films.searchTitle,
        searchStar: state.films.searchStar,
    }

}

const mapDispatchToProps = {
    deleteFilm,
    setCurrentPage,
    setCurrentSearchPage,
    searchFilms,
    fetchFilms
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmList);