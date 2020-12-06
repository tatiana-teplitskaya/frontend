import { ADD_FILM_SUCCESS, 
         FETCH_FILMS,   
         FETCH_FILM,
         DELETE_FILM_SUCCESS,
         SEARCH_FILMS,
         SHOW_LOADER,
         HIDE_LOADER,
         SET_CURRENT_PAGE,
         SET_CURRENT_SEARCH_PAGE,
         SET_SEARCH_TITLE,
         SET_SEARCH_STAR
         } from './types';

export const film = (state = {}, action) => {
    switch(action.type){
        case FETCH_FILM:
            return action.payload
        default: return state
    }
}

export const films = (state = {films: [], pageSize: 10, totalFilmsCount: 0, currentPage: 1, currentSearchPage: 1, searchTitle: '', searchStar: '' }, action) => {
    console.log('test', state)
    switch(action.type){
        case ADD_FILM_SUCCESS:
            return {...state, films: [...state.films, action.payload.film]}
        case FETCH_FILMS:
            return {...state, films: action.payload.films, totalFilmsCount: action.payload.totalCount}
        case SEARCH_FILMS:
            return {...state, films: action.payload.films, totalFilmsCount: action.payload.totalCount}
        case DELETE_FILM_SUCCESS:
            //return {...state, films: deleteFilm(state.films, action.payload.id)}
            return {...state, films: state.films.filter(film => film._id !== action.payload.id)}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload}
        case SET_CURRENT_SEARCH_PAGE:
            return {...state, currentSearchPage: action.payload}
        case SET_SEARCH_TITLE:
            return {...state, searchTitle: action.payload}
        case SET_SEARCH_STAR:
            return {...state, searchStar: action.payload}
        default: return state
    }
}


export const loader = (state = {isLoading: false}, action) => {
    switch (action.type) {
        case SHOW_LOADER: return {...state, isLoading: true}
        case HIDE_LOADER: return {...state, isLoading: false}
        default:
            return state
    }
}