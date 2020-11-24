import { SET_USER_INFO } from '../constants'

const userInfo = (state=[], action={}) => {
    switch (action.type) {
        case SET_USER_INFO:
            return [...action.message]
        default:
            return state
    }
}

export default userInfo