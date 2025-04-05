import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PaymentSuccessComponent } from './payment-success.component';
import { PaymentService } from '../../services/payment/payment.service';
import { CartService } from '../../services/cart/cart.service';

describe('PaymentSuccessComponent', () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;
  let paymentServiceMock: Partial<PaymentService>;
  let cartServiceMock: Partial<CartService>;
  let routeMock: Partial<ActivatedRoute>;
  let routerMock: Partial<Router>;
  const customerMock = { name: 'John Doe', email: 'johndoe@email.com' };

  beforeEach(async () => {
    paymentServiceMock = {
      getPaymentStatus: jest.fn().mockReturnValue(of(customerMock)),
    };

    cartServiceMock = {
      setCart: jest.fn(),
    };

    routeMock = {
      snapshot: {
        queryParamMap: {
          get: jest.fn().mockReturnValue('test-session-id'),
        },
      },
    } as unknown as ActivatedRoute;

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PaymentSuccessComponent],
      providers: [
        { provide: PaymentService, useValue: paymentServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and call getPaymentStatus with session_id', () => {
    const spyGetPaymentStatus = jest.spyOn(component, 'getPaymentStatus');
    component.ngOnInit();
    expect(spyGetPaymentStatus).toHaveBeenCalledWith('test-session-id');
  });

  it('should set customer when paymentService.getPaymentStatus succeeds', () => {
    component.getPaymentStatus('test-session-id');

    expect(component.isLoading).toBe(false);
    expect(component.customer).toEqual(customerMock);
    expect(cartServiceMock.setCart).toHaveBeenCalledWith([]);
  });

  it('should navigate to / when paymentService.getPaymentStatus fails', () => {
    paymentServiceMock.getPaymentStatus = jest
      .fn()
      .mockReturnValue(throwError(() => new Error()));

    component.getPaymentStatus('test-session-id');

    expect(component.isLoading).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
