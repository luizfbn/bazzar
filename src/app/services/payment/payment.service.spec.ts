import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PaymentService } from './payment.service';
import { environment } from '../../../environments/environment';

describe('PaymentService', () => {
  const url = environment.apiUrl;
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create payment checkout', () => {
    const dummyResponse = { success: true };
    const product = { price: '123', quantity: 1 };

    service.createPaymentCheckout([product]).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${url}/payment/checkout`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.method).toBe('POST');

    req.flush(dummyResponse);
  });

  it('should get payment status', () => {
    const dummyResponse = { success: true };
    const sessionId = '321';

    service.getPaymentStatus(sessionId).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      (req) =>
        req.url === `${url}/payment/status` &&
        req.params.get('session_id') === sessionId
    );

    expect(req.request.method).toBe('GET');

    req.flush(dummyResponse);
  });
});
