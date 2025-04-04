import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { paymentSuccessGuard } from './payment-success.guard';

describe('paymentSuccessGuard', () => {
  let navigateMock: jest.Mock;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      paymentSuccessGuard(...guardParameters)
    );

  beforeEach(() => {
    navigateMock = jest.fn();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: { navigate: navigateMock } }],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should activate when session_id is provided', () => {
    const fakeRoute: Partial<ActivatedRouteSnapshot> = {
      queryParamMap: {
        get: (name: string) => (name === 'session_id' ? '123' : null),
      } as any,
    };
    const fakeState = { url: '/success' } as any;

    const result = executeGuard(fakeRoute as any, fakeState);
    expect(result).toBe(true);
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('should not activate when session_id is not provided', () => {
    const fakeRoute: Partial<ActivatedRouteSnapshot> = {
      queryParamMap: {
        get: jest.fn().mockReturnValue(null),
      } as any,
    };
    const fakeState = { url: '/success' } as any;

    const result = executeGuard(fakeRoute as any, fakeState);
    expect(result).toBe(false);
    expect(navigateMock).toHaveBeenCalledWith(['/']);
  });
});
