import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessmodelComponent } from './businessmodel.component';

describe('BusinessmodelComponent', () => {
  let component: BusinessmodelComponent;
  let fixture: ComponentFixture<BusinessmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessmodelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
