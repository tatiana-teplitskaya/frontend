import { ADD_FILM_SUCCESS, FETCH_FILMS, FETCH_FILM, DELETE_FILM_SUCCESS } from './types';

export const film = (state = {}, action) => {
    switch(action.type){
        case FETCH_FILM:
            return action.payload
        default: return state
    }
}

export const films = (state = [], action) => {
    switch(action.type){
        case ADD_FILM_SUCCESS:
            return [...state, action.payload.film]
        case FETCH_FILMS:
            return action.payload
        case DELETE_FILM_SUCCESS:
            //return {...state, films: deleteFilm(state.films, action.payload.id)}
            return state.filter(film => film._id !== action.payload.id)
        default: return state
    }
}