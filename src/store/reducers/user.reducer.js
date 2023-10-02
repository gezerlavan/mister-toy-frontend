import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action = {}) {
    let users
    switch (action.type) {

        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case REMOVE_USER:
            users = state.users.filter(user => user._id !== action.userId)
            return { ...state, users }

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_WATCHED_USER:
            return { ...state, watchedUser: action.user }

        case SET_USER_SCORE:
            const user = { ...state.loggedinUser, score: action.score }
            return { ...state, loggedinUser: user }

        default:
            return state
    }
}