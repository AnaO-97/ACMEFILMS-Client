import * as ACTION from "./actionsTypes";

const stateInicial = {
    user:{
        email: "",
        userType: "",
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

    console.log(payload)
    if (type === ACTION.LOGIN_USER){
        return({
            ...state,
            user: {...payload} ,
        })
    }

    return({ ...state })
}

export default reducer;