import { ADD_USER_ONLINE_INFO } from '../constants'

const initState = {
    username: "",
    room: "",
    score: "",
    board: [],
}

const onlineGameInfo =  (state=initState, action={}) => {
    switch (action.type) {
        case ADD_USER_ONLINE_INFO:
            return {
                username: action.message.username,
                room: action.message.room,
                score: action.message.score,
                board: action.message.board,
            }
        default:
            return state;
    }
}

export default onlineGameInfo;