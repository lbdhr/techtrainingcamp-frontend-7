import axios from 'axios'
import { SET_USER_INFO } from "../constants";

export const getUserInfo = () =>{
    return dispatch =>{
        // return axios.get(`/api/users/${username}`,username)
        return axios.get("/api/users/usercenter/rankings",{params: null})
    }
}

export const setUserInfo = (message) => {
    return {
        type: SET_USER_INFO,
        message
    }
}