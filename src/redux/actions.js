import axios from "axios";
import * as ACTION from "./actionsTypes";

const server= "http://localhost:3001";

export function loginUser( userData ) {
    return ( async (dispatch) => { 
        let userLogin = {};

        try {
            userLogin = await axios.post(`${server}/user/login`, userData);
            
            dispatch({
                type    : ACTION.LOGIN_USER,
                payload : userLogin.data
            })

        } catch (error) {
            if( error.response )
                window.alert(error.response.data);
            else{
                console.log(error)
                window.alert( "Error ingresando el usuario" );
            }
        }
    });
}

export function deleteFilm( idFilm ) {
    return ( async (dispatch) => { 
        let filmDeleted = {};

        console.log(idFilm);
        

        try {
            filmDeleted = await axios.delete(`${server}/film/delete/${idFilm}`);
            
            dispatch({
                type    : ACTION.DELETE_FILM,
                payload : filmDeleted.data
            })

        } catch (error) {
            if( error.response )
                window.alert(error.response.data);
            else{
                console.log(error)
                window.alert( "Error eliminando la nueva película" );
            }
        }
    });
}

export function newFilm( filmData ) {
    return ( async (dispatch) => { 
        let filmCreated = {};

        try {
            filmCreated = await axios.post(`${server}/film/create`, filmData);
            
            dispatch({
                type    : ACTION.NEW_FILM,
                payload : filmCreated.data
            })

        } catch (error) {
            if( error.response )
                window.alert(error.response.data);
            else{
                console.log(error)
                window.alert( "Error creando la nueva película" );
            }
        }
    });
}

export function editFilm( newFilmData, idFilm ) {
    return ( async (dispatch) => { 
        let filmUpdated = {};

        try {
            filmUpdated = await axios.put(`${server}/film/${idFilm}`, newFilmData);
            
            dispatch({
                type    : ACTION.EDIT_FILM,
                payload : {
                    newFilm : {...filmUpdated.data},
                    idBefore : idFilm
                }
            })

        } catch (error) {
            if( error.response )
                window.alert(error.response.data);
            else{
                console.log(error)
                window.alert( "Error modificando la película" );
            }
        }
    });
}

export function allFilms() {
    return ( async (dispatch) => { 
        let filmsDB = [];

        try {
            filmsDB = await axios.get(`${server}/film/all`);
            
            dispatch({
                type    : ACTION.ALL_FILMS,
                payload : filmsDB.data
            })

        } catch (error) {
            if( error.response )
                window.alert(error.response.data);
            else{
                console.log(error)
                window.alert( "Error obteniendo los films" );
            }
        }
    });
}

export function addFilmFavorites(idFilm){
    return({
        type: ACTION.ADD_FAVORITES,
        payload: idFilm
    })
}

export function filterFilm(filter){
    return({
        type: ACTION.FILTER_FILMS,
        payload: filter
    })
}