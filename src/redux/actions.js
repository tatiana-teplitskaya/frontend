import { 
    ADD_FILM_SUCCESS,
    FETCH_FILMS,
    FETCH_FILM,
    SEARCH_FILMS,
    FETCH_ERROR,
    SHOW_LOADER,
    HIDE_LOADER,
    DELETE_FILM_SUCCESS,
    SET_CURRENT_PAGE,
    SET_CURRENT_SEARCH_PAGE,
    SET_SEARCH_STAR,
    SET_SEARCH_TITLE
 } from './types';
import { getFilms, getFilmsBySearch, deleteFilmById, sendFilm, getFilmById } from '../services/services';
import { toast } from 'react-toastify';

export function addFilm(film){
    return async dispatch => {
        try{
            const response = await sendFilm(film);
            if (response.status == 201){
                toast.success('Movie was successfully created!');
                dispatch({ type: ADD_FILM_SUCCESS, payload: { film } });
            } else {
                throw new Error(response.statusText);
             } 
        }  catch(error){
            console.log(error);
            toast.error(error.message);
            throw new Error(error);
        }

        
    }
}

export const showLoader = () => ({type: SHOW_LOADER});
export const hideLoader = () => ({type: HIDE_LOADER});


export const fetchError = (error) => ({
    type: FETCH_ERROR,
    payload: { error },
  });

export function fetchFilms(currentPage, pageSize){
    return async dispatch => {
        dispatch(showLoader());
        try {
            const response = await getFilms(currentPage, pageSize);
            dispatch({ type: FETCH_FILMS, payload: { films: response.films, totalCount: response.totalCount } })
        } catch(error){
            dispatch(fetchError(error.message));
        }
        finally{
            dispatch(hideLoader());
        }
    }
}

export function fetchFilm(id){
    return async dispatch => {
        dispatch(showLoader());
        try {
            const response = await getFilmById(id);
            console.log()
            dispatch({ type: FETCH_FILM, payload: response })
        } catch(error){
            dispatch(fetchError(error.message));
        }
        finally{
            dispatch(hideLoader());
        }
    }
}

export function searchFilms(search){
    return async dispatch => {
        dispatch(showLoader())
        try {
            const response = await getFilmsBySearch(search);
            dispatch({ type: SEARCH_FILMS, payload: { films: response.films, totalCount: response.totalCount } })
        } catch(error){
            dispatch(fetchError(error.message));
        }
        finally{
            dispatch(hideLoader());
        }
    }
}

export function deleteFilm(id){
    return async dispatch => {
        try {
            const response = await deleteFilmById(id);
            if (response.status === 200) {
                dispatch(deleteFilmSuccess(id));
                toast.success('Movie has been deleted!')
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            toast.error(error)
            console.log(error);
        }
    }
}

export function deleteFilmSuccess(id){
    return ({
    type: DELETE_FILM_SUCCESS,
    payload: { id },
    })
  }

export function setCurrentPage(pageNumber) {
    return ({
        type: SET_CURRENT_PAGE,
        payload: pageNumber
    })
}

export function setCurrentSearchPage(pageNumber) {
    return ({
        type: SET_CURRENT_SEARCH_PAGE,
        payload: pageNumber
    })
}

export function setSearchTitle(value) {
    return ({
        type: SET_SEARCH_TITLE,
        payload: value
    })
}

export function setSearchStar(value) {
    return ({
        type: SET_SEARCH_STAR,
        payload: value
    })
}