import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticate(username, password) {
    if (username == "ovi" && password == "dummy") {
      sessionStorage.setItem("userName", username)
      return true
    }
    else {
      return false
    }
  }

  isLoggedIn() {
    let user = sessionStorage.getItem("userName")
    return !(user == null)
  }

  logOut() {
    sessionStorage.removeItem("userName")
  }
}
