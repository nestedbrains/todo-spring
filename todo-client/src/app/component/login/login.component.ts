import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "ovi"
  password = "dummy"
  errorMessage = "Invalid Username and Password"
  invalidLogin = false

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleInputs() {
    if (this.authService.authenticate(this.username, this.password)) {
      this.invalidLogin = false
      this.route.navigate(['welcome'])
    }
    else {
      this.invalidLogin = true
    }
  }
}
