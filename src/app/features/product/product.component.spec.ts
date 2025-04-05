import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product/product.service';
import { PaymentService } from '../../services/payment/payment.service';
import { CartService } from '../../services/cart/cart.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productServiceMock: Partial<ProductService>;
  let paymentServiceMock: Partial<PaymentService>;
  let cartServiceMock: Partial<CartService>;
  let routeMock: Partial<ActivatedRoute>;
  const product = {
    id: '123',
    name: 'Watch',
    active: true,
    description: 'Nice watch',
    images: ['mock.jpeg'],
    price: 10,
    defaultPrice: '123',
    currency: 'brl',
  };

  beforeEach(async () => {
    productServiceMock = {
      getProductById: jest.fn().mockReturnValue(of(product)),
    };

    paymentServiceMock = {
      createPaymentCheckout: jest
        .fn()
        .mockReturnValue(of('http://example.com')),
    };

    cartServiceMock = {
      cart: signal([]),
      addProduct: jest.fn(),
    };

    routeMock = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(product.id),
        },
      },
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: PaymentService, useValue: paymentServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product on init', () => {
    component.ngOnInit();
    expect(productServiceMock.getProductById).toHaveBeenCalledWith(product.id);
    expect(component.product).toEqual(product);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when fetching product', () => {
    productServiceMock.getProductById = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Error fetching product')));
    component.getProduct();
    expect(component.isLoading).toBe(false);
  });

  it('should add product to cart', () => {
    component.addToCart(product);
    expect(cartServiceMock.addProduct).toHaveBeenCalledWith(product);
  });

  it('should check if product is in cart', () => {
    cartServiceMock.cart!.set([product]);
    expect(component.isProductInCart()).toBe(true);
  });

  it('should redirect to URL on successful checkout', () => {
    const mockWindow = { location: { href: '' } } as Window;
    jest
      .spyOn(window, 'location', 'get')
      .mockImplementation(() => mockWindow.location);

    component.buyNow(product);
    expect(mockWindow.location.href).toBe('http://example.com');
  });
});
