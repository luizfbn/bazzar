import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HomeComponent } from './home.component';
import { ProductService } from '../../services/product/product.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productServiceMock: Partial<ProductService>;
  let routeMock: Partial<ActivatedRoute>;
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
    productServiceMock = {
      getProducts: jest.fn().mockReturnValue(of(products)),
    };

    routeMock = {
      snapshot: {
        queryParamMap: {
          get: jest.fn().mockReturnValue('test-id'),
        },
      },
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    const spyGetProducts = jest.spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(spyGetProducts).toHaveBeenCalled();
  });

  it('should set products when productService.getProducts succeeds', () => {
    component.getProducts();

    expect(component.isLoading).toBe(false);
    expect(component.products).toEqual(products);
  });

  it('should set isLoading false when productService.getProducts fails', () => {
    productServiceMock.getProducts = jest
      .fn()
      .mockReturnValue(throwError(() => new Error()));

    component.getProducts();

    expect(component.isLoading).toBe(false);
  });
});
