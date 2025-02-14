import * as ACTION from "./actionsTypes";

const stateInicial = {
    user:{
        email: "",
        userType: "user",
        fullName: "",
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
            copyFilmData: [ ...state.fullFilmData, payload ],            
        })
    }

    if (type === ACTION.ALL_FILMS){
        return({
            ...state,
            fullFilmData: [ ...payload ],            
            copyFilmData: [ ...payload ]
        })
    }

    if (type === ACTION.FILTER_FILMS){
        const { by, same } = payload;
        let filmDataFiltered= []

        // console.log(by, same);

        if(by === "allFilms"){
            filmDataFiltered = [ ...state.fullFilmData ]
        }

        if(by === "favorites"){
            filmDataFiltered = [ ...state.favoritesFilms ]
        }
        
        if(by === "title" || by === "releaseDate"){
            filmDataFiltered = state.fullFilmData.filter((film)=> film[by].toLowerCase().includes(same.toLowerCase()))
        }

        if(by === "actors"){
            filmDataFiltered = state.fullFilmData.filter((film)=>                
                film[by].some(actor => actor.toLowerCase().includes(same.toLowerCase()))
            )            
        }

        if(by === "score"){
            filmDataFiltered = state.fullFilmData.filter((film)=>film[by] === Number(same))
        }

        if(by === "genre"){
            filmDataFiltered = state.fullFilmData.filter((film)=>film[by].toLowerCase().includes(same.toLowerCase()))
        }

        if(by === "favorites"){
            filmDataFiltered = state.fullFilmData.filter((film) => state.favoritesFilms.includes(film.id))
        }

        return({
            ...state,
            copyFilmData: [ ...filmDataFiltered ]
        })
    }

    if (type === ACTION.DELETE_FILM){        
        let filmDataDeleted = state.fullFilmData.filter((film)=> film.id !== payload.id)
        
        return({
            ...state,
            fullFilmData: [ ...filmDataDeleted ],
            copyFilmData: [ ...filmDataDeleted ],
        })
    }

    if (type === ACTION.EDIT_FILM){ 
        const { newFilm, idBefore } = payload;

        const filmDataUpdated = state.fullFilmData.map((film)=>film.id === idBefore ?{...newFilm} :{...film})
        const copyFilmDataUpdated = state.copyFilmData.map((film)=>film.id === idBefore ?{...newFilm} :{...film})        

        return({
            ...state,
            fullFilmData: [ ...filmDataUpdated ],
            copyFilmData: [ ...copyFilmDataUpdated ],
        })
    }

    if (type === ACTION.ADD_FAVORITES){ 
        const idFilm = payload;
        let editFavoritesFilms = [];

        if(state.favoritesFilms.includes(idFilm)){
            editFavoritesFilms = state.favoritesFilms.filter((idFav)=> idFav !== idFilm)
        }
        else
            editFavoritesFilms = [ ...state.favoritesFilms, idFilm ]

        return({
            ...state,
            favoritesFilms : [ ...editFavoritesFilms ]
        })
    }

    return({ ...state })
}

export default reducer;