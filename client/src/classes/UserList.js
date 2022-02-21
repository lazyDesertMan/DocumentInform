import {makeAutoObservable} from "mobx";

export default class UserList {
    constructor() {
        this._data = new Array();
        makeAutoObservable(this)
    }

    set list(data) {
        this._data = data
    }
    
    get list() {
        return this._data
    }
}