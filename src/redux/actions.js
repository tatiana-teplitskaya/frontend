import { 
    ADD_FILM_SUCCESS,
    FETCH_FILMS,
    FETCH_FILM,
    FETCH_ERROR,
    SHOW_LOADER,
    HIDE_LOADER,
    DELETE_FILM_SUCCESS,
 } from './types';
import { getFilms, getFilmsBySearch, deleteFilmById, sendFilm, getFilmById } from '../services/services';

export function addFilm(film){
    return async dispatch => {
        try{
            const response = await sendFilm(film);
            if (response.ok){
                dispatch({ type: ADD_FILM_SUCCESS, payload: { film } })
            } else {
                dispatch(fetchError(response.message));
             } 
        }  catch(error){

            dispatch(fetchError(error.message));
            console.log(error);
        }

        
    }
}

export const showLoader = () => ({type: SHOW_LOADER});
export const hideLoader = () => ({type: HIDE_LOADER});


export const fetchError = (error) => ({
    type: FETCH_ERROR,
    payload: { error },
  });

export function fetchFilms(){
    return async dispatch => {
        dispatch(showLoader());
        try {
            const response = await getFilms();
            dispatch({ type: FETCH_FILMS, payload: response })
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
            dispatch({ type: FETCH_FILMS, payload: response })
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
            if (response.ok) {
                dispatch(deleteFilmSuccess(id));
            } else {
                dispatch(fetchError(response.message));
            }
        } catch (error) {
            dispatch(fetchError(error.message));
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

