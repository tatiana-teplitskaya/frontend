import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { films, film} from './redux/filmsReducer';

const reducer = combineReducers({
    film,
    films
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;