import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFilms, searchFilms } from '../../redux/actions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar';
import FilmsList from './FilmList';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const FilmsPage = ({allFilms, fetchFilms, searchFilms}) => {
    const classes = useStyles();

    const [searchTitle, setSearchTitle] = useState('');
    const [searchStar, setSearchStar] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    function searchTitleChangeHanler(e) {
        setSearchTitle(e.target.value);
        if (searchTimeout !== false){
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout( value => {
            searchFilms(value);
        }, 500, {title: e.target.value, star: searchStar}))
    }

    function searchStarChangeHanler(e) {
        setSearchStar(e.target.value);
        if (searchTimeout !== false){
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout( value => {
            searchFilms(value);
        }, 500, {title: searchTitle, star: e.target.value}))
    }

    function sortChangeHandler() {
        sortOrder === 'asc' ? 
        setSortOrder('desc') :
        setSortOrder('asc');
        sortFilms(allFilms, sortOrder)
    }

    function sortFilms(arrOfFilms, order) {
        arrOfFilms.sort((a, b) => {
            const title1 = a.title.toLowerCase();
            const title2 = b.title.toLowerCase();
            if (title1 > title2) {
                return order === 'asc' ? 1 : -1;
            }
            if (title1 < title2) {
                return order === 'asc' ? -1 : 1;
            }
            return 0;
        })
    }

    return(
        <div>
            <NavBar />
            <div className={classes.root}>
                <TextField id="standard-search" value={searchTitle} onChange={e => searchTitleChangeHanler(e)} label="Search by title" type="search" />
                <input value={searchStar} onChange={e => searchStarChangeHanler(e)} type='text' placeholder='star'/>
                <button onClick={() => sortChangeHandler()}>{sortOrder === 'asc' ? 'A - Z' : 'Z - A'}</button>
            </div>
            <FilmsList films = { allFilms }/>
        </div>
        
    )
            
}

const mapStateToProps = state => {

    console.log(state)
    return {
        allFilms: state.films
    }

}

const mapDispatchToProps = {
    fetchFilms,
    searchFilms
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsPage);