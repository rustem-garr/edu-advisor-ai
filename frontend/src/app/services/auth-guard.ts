import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    return true;
  }

  return router.navigate(['/login']);
};
