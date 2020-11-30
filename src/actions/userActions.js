import axios from 'axios'
import { SET_USER_INFO } from "../constants";
import { ADD_USER_ONLINE_INFO } from '../constants'

export const getUserInfo = () =>{
    return dispatch =>{
        // return axios.get(`/api/users/${username}`,username)
        return axios.get("/api/users/usercenter/rankings",{params: null})
    }
}


export const uploadSocre = (scoreDetails) => {
    console.log("begin to upload score!");
    return dispatch =>{
        return axios.post("/api/users/usercenter/scoreupload", scoreDetails);
    }
}

export const setUserInfo = (message) => {
    return {
        type: SET_USER_INFO,
        message
    }
}

export const addUserOnlineInfo = (message) => {
    return {
        type: ADD_USER_ONLINE_INFO,
        message
    }
}