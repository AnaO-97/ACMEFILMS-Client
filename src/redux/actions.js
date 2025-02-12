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