import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const paymentSuccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionId = route.queryParamMap.get('session_id');

  if (!sessionId) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
