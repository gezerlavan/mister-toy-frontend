
import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 1000 }
    const signedUpUser = await httpService.post(BASE_URL + 'signup', user)
    if (signedUpUser) return _setLoggedinUser(user)
}

async function updateScore(diff) {
    const user = await userService.getById(getLoggedinUser()._id)
    if (user.score + diff < 0) return Promise.reject('No credit')
    user.score += diff
    await storageService.put(STORAGE_KEY, user)
    _setLoggedinUser(user)
    return user.score
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}