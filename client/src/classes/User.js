import {makeAutoObservable} from "mobx";

export default class User {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._isLeader = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setIsLeader(bool) {
        this._isLeader = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get isLeader() {
        return this._isLeader
    }
    get user() {
        return this._user
    }
}
