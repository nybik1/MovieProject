import {
    LOAD_MOVIES_PENDING,
    LOAD_MOVIES_FULFILLED,
    LOAD_MOVIES_REJECTED,
    GET_MOVIE,
    SEARCH_MOVIES,
    SET_FILTER_MOVIE
} from '../actions/movie_actions';




const initialState = {
    list: [],
    loaded: false,
    loading: false,
    error: null,
    total: 0,
    movie: {},
    isSearch: false,
    selectedOption: [],
}

function movies(state = initialState, action) {
    switch (action.type) {
        case LOAD_MOVIES_FULFILLED:
            return {
                ...state,
                list: action.payload.items,
                total: action.payload.total,
                loading: false,
                isSearch: false,
            }
        case LOAD_MOVIES_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case LOAD_MOVIES_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload,

            }
        case SEARCH_MOVIES:
            return {
                ...state,
                list: action.payload.items,
                total: action.payload.total,
                loading: false,
                isSearch: true,
            }
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            }

        case SET_FILTER_MOVIE:
            return {
                ...state,
                selectedOption: action.payload.genre,
            }
        default:
            return state
    }
}

export default movies;