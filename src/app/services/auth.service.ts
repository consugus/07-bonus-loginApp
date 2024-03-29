import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private api_key= 'AIzaSyCxo7WMCBE2rHPlyH6kRCxXokziQ6C4P3E';
  private userToken:string;

  // ====================================
  //           Create new users
  // ====================================
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]



  // ====================================
  //       Autenticate existing User
  // ====================================
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http:HttpClient ) {
    this.getToken();
   }


  logout(  ){
    localStorage.removeItem('token');
   }

  login( user:UserModel ){
    const authData= {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${this.api_key}`, authData)
    .pipe(
      map( res =>{
        this.setToken(res['idToken']);
        return res;
      })
    );
   }

  newUser( user:UserModel ){
    const authData= {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signUp?key=${this.api_key}`, authData)
    .pipe(
      map( res =>{
        this.setToken(res['idToken']);
        return res;
      })
    );
  }


  private setToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let expirationTime = new Date().setSeconds( 3600 );
    localStorage.setItem( 'expirationTime', expirationTime.toString() );
  }

  getToken(){
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }
    return this.userToken;
  }

  autenticated(): boolean{

    if( this.userToken.length < 2 ){
      return false;
    }

    let expirationTime = new Date()
    if( localStorage.getItem('expirationTime') ){
      expirationTime.setTime(Number(localStorage.getItem('expirationTime')));
    }

    if( expirationTime < new Date() ){
      return false
    }

    return true;

  }




} // end AuthService class