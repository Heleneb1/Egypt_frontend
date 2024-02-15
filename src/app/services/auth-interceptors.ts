// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor (private cookieService: CookieService) { }
//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const token = this.cookieService.get('token');


//     if (token) {
//       request = request.clone({
//         setHeaders: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//     }
//     return next.handle(request);
//   }
// }
