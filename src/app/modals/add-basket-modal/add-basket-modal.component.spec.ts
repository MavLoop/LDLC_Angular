import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasketModalComponent } from './add-basket-modal.component';

describe('AddBasketModalComponent', () => {
  let component: AddBasketModalComponent;
  let fixture: ComponentFixture<AddBasketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBasketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBasketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
