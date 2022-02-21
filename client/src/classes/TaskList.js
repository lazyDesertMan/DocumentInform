import {makeAutoObservable} from "mobx";

export default class TaskList {
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