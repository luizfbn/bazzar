import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
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
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set cart', () => {
    service.setCart([product]);

    expect(service.cart()).toEqual([product]);
  });

  it('should set cart open', () => {
    service.setCartOpen(true);

    expect(service.isCartOpen()).toBeTruthy();
  });

  it('should add product', () => {
    service.addProduct(product);

    expect(service.cart()).toEqual([product]);
  });

  it('should not have same product when add', () => {
    service.setCart([product]);
    service.addProduct(product);

    expect(service.cart()).toEqual([product]);
  });

  it('should remove product', () => {
    service.setCart([product]);
    service.removeProduct(product);

    expect(service.cart()).toEqual([]);
  });
});
