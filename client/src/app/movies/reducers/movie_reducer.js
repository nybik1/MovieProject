import {
    LOAD_MOVIES_PENDING,
    LOAD_MOVIES_FULFILLED,
    LOAD_MOVIES_REJECTED,
    LOAD_TRENDING_MOVIES,
    LOAD_TOP_MOVIES,
    GET_MOVIE,
    SEARCH_MOVIES,
    SET_FILTER_MOVIE,
    SET_QUERY
} from '../actions/movie_actions';




const initialState = {
    list: [],
    trending: [],
    toprated: [],
    loaded: false,
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    movie: {},
    isSearch: false,
    selectedOption: [],
    query: ''
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
                currentPage: action.payload.page,
            }

        case LOAD_TRENDING_MOVIES:
            return {
                ...state,
                trending: action.payload.items
            }
        case LOAD_TOP_MOVIES:
            return {
                ...state,
                toprated: action.payload.items
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
                currentPage: action.payload.page
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
        case SET_QUERY:
            return {
                ...state,
                query: action.payload.query,
                isSearch: action.payload.isSearch,
            }
        default:
            return state
    }
}

export default movies;