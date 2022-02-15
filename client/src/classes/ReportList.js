import {makeAutoObservable} from "mobx";

export default class ReportList {
    constructor() {
        this._data = null;
        makeAutoObservable(this)
    }

    set list(data) {
        this._data = data
    }
    
    get list() {
        return this._data
    }
}