import * as ACTION from "./actionsTypes";

const stateInicial = {
    user:{
        email: "",
        userType: "admin",
        fullName: "",
    },
    filter : {
        by: "",
        same: ""
    },
    fullFilmData: [],
    copyFilmData: [],
    favoritesFilms: [],
};

function reducer (state= stateInicial, action){
    const {type, payload} = action;

    if (type === ACTION.LOGIN_USER){
        return({
            ...state,
            user: {...payload} ,
        })
    }
    
    if (type === ACTION.NEW_FILM){
        return({
            ...state,
            fullFilmData: [ ...state.fullFilmData, payload ],            
        })
    }

    if (type === ACTION.ALL_FILMS){
        return({
            ...state,
            fullFilmData: [ ...payload ],            
            copyFilmData: [ ...payload ]
        })
    }

    return({ ...state })
}

export default reducer;