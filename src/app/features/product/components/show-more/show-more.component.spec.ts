import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowMoreComponent } from './show-more.component';

describe('ShowMoreComponent', () => {
  let component: ShowMoreComponent;
  let fixture: ComponentFixture<ShowMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMoreComponent);
    component = fixture.componentInstance;
    component.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    component.length = 15;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display truncated text when showMore is false', () => {
    component.text = 'This is a long text for testing purposes.';
    component.length = 10;
    component.showMore = false;

    fixture.detectChanges();

    const textElement = fixture.debugElement.query(
      By.css('.text')
    ).nativeElement;

    expect(textElement.textContent.trim()).toBe('This is a ...');
  });

  it('should display full text when showMore is true', () => {
    component.text = 'This is a long text for testing purposes.';
    component.length = 10;
    component.showMore = true;

    fixture.detectChanges();

    const textElement = fixture.debugElement.query(
      By.css('.text')
    ).nativeElement;

    expect(textElement.textContent.trim()).toBe(
      'This is a long text for testing purposes.'
    );
  });

  it('should toggle showMore when handleClick()', () => {
    component.showMore = false;

    component.handleClick();
    expect(component.showMore).toBe(true);

    component.handleClick();
    expect(component.showMore).toBe(false);
  });
});
