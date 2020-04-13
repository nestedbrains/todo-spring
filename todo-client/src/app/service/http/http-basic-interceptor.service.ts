import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpBasicInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    let userName = this.authService.getAuthUser()
    let autheticationString = this.authService.getAuthToken()

    if (userName && autheticationString) {
      request = request.clone({
        setHeaders: {
          Authorization: autheticationString
        }
      })
    }

    return next.handle(request)
  }
}