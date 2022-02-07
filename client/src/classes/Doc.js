import {makeAutoObservable} from "mobx";

export default class Doc {
    constructor() {
        this._data = {}
        makeAutoObservable(this)
    }
    setDoc(data) {
        this._data = data
    }
    get data() {
        return this._data
    }
}