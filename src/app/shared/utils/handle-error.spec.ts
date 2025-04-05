import { handleError } from './handle-error';
import { HttpErrorResponse } from '@angular/common/http';

describe('handleError', () => {
  it('should handle client error', (done) => {
    const mockError = new ErrorEvent('Client error', {
      message: 'Client-side error occurred',
    });
    const httpErrorResponse = new HttpErrorResponse({
      error: mockError,
      status: 0,
      statusText: '',
    });

    jest.spyOn(console, 'error');

    handleError(httpErrorResponse).subscribe({
      error: (error) => {
        try {
          expect(error.message).toContain(
            'Client error: Client-side error occurred'
          );
          expect(console.error).toHaveBeenCalledWith(
            'Client error:',
            'Client-side error occurred'
          );
          done();
        } catch (error) {
          done(error);
        }
      },
    });
  });

  it('should handle server error', (done) => {
    const mockErrorResponse = {
      error: null,
      status: 500,
      message: 'Server error occurred',
    } as HttpErrorResponse;

    jest.spyOn(console, 'error');

    handleError(mockErrorResponse).subscribe({
      error: (error) => {
        try {
          expect(error.message).toContain('Error 500 - Server error occurred');
          expect(console.error).toHaveBeenCalledWith(
            'Server error: 500 - Server error occurred'
          );
          done();
        } catch (error) {
          done(error);
        }
      },
    });
  });
});
