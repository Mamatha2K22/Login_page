import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const token = localStorage.getItem('token');// Get the token from localStorage
   console.log('authInterceptor called. Token:', token); 
   const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })//If token exists, clone the original request and add the Authorization header
      : req
  return next(authReq);
};
