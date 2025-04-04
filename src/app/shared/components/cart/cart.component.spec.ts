import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { CartComponent } from './cart.component';
import { CartService } from '../../../services/cart/cart.service';
import { PaymentService } from '../../../services/payment/payment.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: Partial<CartService>;
  let paymentServiceMock: Partial<PaymentService>;
  const products = [
    {
      id: '123',
      name: 'Watch',
      active: true,
      description: 'Nice watch',
      images: ['mock.jpeg'],
      price: 10,
      defaultPrice: '123',
      currency: 'brl',
    },
    {
      id: '321',
      name: 'TV',
      active: true,
      description: 'Samsung TV',
      images: ['mock.jpeg'],
      price: 2000,
      defaultPrice: '321',
      currency: 'brl',
    },
  ];

  beforeEach(async () => {
    cartServiceMock = {
      isCartOpen: signal(true),
      cart: signal(products),
      setCartOpen: jest.fn(),
      removeProduct: jest.fn(),
    };
    paymentServiceMock = {
      createPaymentCheckout: jest.fn(),
    };
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CartService, useValue: cartServiceMock },
        { provide: PaymentService, useValue: paymentServiceMock },
      ],
      imports: [CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cart when isCartOpen is true', () => {
    const cartWrapper = fixture.debugElement.query(By.css('.cart-wrapper'));
    expect(cartWrapper.classes['hidden']).toBeFalsy();
  });

  it('should show cart products', () => {
    const products = fixture.debugElement.queryAll(By.css('.product'));
    expect(products.length).toBe(2);
    const productName = products[0].query(By.css('.name')).nativeElement
      .textContent;
    expect(productName).toContain('Watch');
  });

  it('should setCartOpen(false) on background click', () => {
    const background = fixture.debugElement.query(By.css('.cart-background'));
    background.triggerEventHandler('click', null);
    expect(cartServiceMock.setCartOpen).toHaveBeenCalledWith(false);
  });

  it('should removeProduct() on remove button', () => {
    const removeButton = fixture.debugElement.query(By.css('.btn-remove'));
    removeButton.triggerEventHandler('click', null);
    expect(cartServiceMock.removeProduct).toHaveBeenCalledWith(products[0]);
  });

  it('should disable purchase button when isPurchaseBtnDisabled is true', () => {
    component.isPurchaseBtnDisabled = true;
    fixture.detectChanges();
    const purchaseButton = fixture.debugElement.query(By.css('.button.alt'));
    expect(purchaseButton.nativeElement.disabled).toBeTruthy();
  });

  it('should format products for checkout', () => {
    const checkoutProducts = component.formatProductsForCheckout(products);
    expect(checkoutProducts).toEqual([
      { price: products[0].defaultPrice, quantity: 1 },
      { price: products[1].defaultPrice, quantity: 1 },
    ]);
  });

  it('should redirect to URL upon successful checkout', () => {
    const mockWindow = { location: { href: '' } } as Window;
    jest
      .spyOn(window, 'location', 'get')
      .mockImplementation(() => mockWindow.location);

    paymentServiceMock.createPaymentCheckout = jest
      .fn()
      .mockReturnValue(of('http://example.com'));

    component.completePurchase(products);
    expect(mockWindow.location.href).toBe('http://example.com');
  });
});
