import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routeMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    routeMock = {
      snapshot: {
        queryParamMap: {
          get: jest.fn().mockReturnValue('test-id'),
        },
      },
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
