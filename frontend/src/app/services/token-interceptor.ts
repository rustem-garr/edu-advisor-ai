import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {Auth} from './auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();

  if(token){
    const clonedReq =  req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  return next(req);
};
