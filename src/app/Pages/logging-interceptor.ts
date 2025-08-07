import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request to', req.url);
  return next(req).pipe(tap(event => console.log('Response:', event)));//.pipe() is to tap into the response stream without altering it
};
