import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpBasicInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthService) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    console.log('username', this.authenticationService.username)
    console.log('username', this.authenticationService.password)

    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}