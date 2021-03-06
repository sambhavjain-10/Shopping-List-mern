import axios from 'axios';
import { returnErrors } from "./errorActions";

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
 } from "./types";

//register user
export const register = ({name, email, password}) => dispatch => {
    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //request body
    const body = JSON.stringify({name, email, password})

    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        })
}

//login user
export const login = ({email, password}) => dispatch => {
    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //request body
    const body = JSON.stringify({email, password})

    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//Check Token and Load User
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState()))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        });
}


export const tokenConfig = getState => {
    //get token from localstorage
    const token = getState.auth.token;

    //headers
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }

    //If token, add to headers

    if(token){
        config.headers["x-auth-token"] = token;
    }

    return config;
}