import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  // client side
  if (error.error instanceof ErrorEvent) {
    console.error('Client error:', error.error.message);
    return throwError(() => new Error(`Client error: ${error.error.message}`));
  }
  // server side
  console.error(`Server error: ${error.status} - ${error.message}`);
  return throwError(
    () => new Error(`Error ${error.status} - ${error.message}`)
  );
}
