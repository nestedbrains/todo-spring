import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: String;
  public password: String;

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  constructor(private http: HttpClient) { }

  executeBasicAuthenticate(username, password) {
    console.log(username)
    console.log(password)
    return this.http.get(`http://localhost:8080/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    console.log('userName', username)
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  getAuthUser() {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  }

  getAuthToken() {
    if (this.getAuthUser()) {
      return sessionStorage.getItem("token")
    }
  }

  isLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    return !(user == null)
  }

  logOut() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  }
}