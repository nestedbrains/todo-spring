import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(username, password) {
    if (username == "ovi" && password == "dummy") {
      sessionStorage.setItem("userName", username)
      return true
    }
    else {
      return false
    }
  }

  executeBasicAuthenticate(userName, password) {
    console.log(userName)
    console.log(password)
    let basicAuthHeaderString = 'Basic' + window.btoa(userName + ":" + password)

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get(`http://localhost:8080/users`,
      { headers }).pipe(
        map(
          (data) => {
            sessionStorage.setItem("authUser", userName)
            sessionStorage.setItem("token", basicAuthHeaderString)
            return data
          }
        )
      )
  }

  getAuthUser() {
    let user = sessionStorage.getItem("authUser")
    return !(user == null)
  }

  getAuthToken() {
    if (this.getAuthUser()) {
      return sessionStorage.getItem("token")
    }
  }

  isLoggedIn() {
    let user = sessionStorage.getItem("authUser")
    return !(user == null)
  }

  logOut() {
    sessionStorage.removeItem("authUser")
    sessionStorage.removeItem("token")
  }
}