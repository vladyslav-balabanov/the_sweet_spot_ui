import { makeAutoObservable } from "mobx";

export interface User {
    name:string,
    role:string,
}

export default class UserStore {
    private _isAuthorize:boolean;
    private _user: User;

    constructor() {
        this._isAuthorize = false;
        this._user = {} as User;
        makeAutoObservable(this);
    }

    setIsAuth(bool:boolean) {
        this._isAuthorize = bool;
    }

    setUser(user: User) {
        this._user = user
    }

    get isAuth(): boolean{
        return this._isAuthorize;
    }

    get user(): User{
        return this._user;
    }
}