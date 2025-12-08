export class StorageManager{

    static setToken(token:string){
           localStorage.setItem('token', token);
    }
    static getToken(){
           return localStorage.getItem('token');
    }
    static isAuthenticated(){
           return localStorage.getItem('token')?true:false;
    }

}