import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserlistsComponent } from './list-userlists.component';

describe('ListUserlistsComponent', () => {
  let component: ListUserlistsComponent;
  let fixture: ComponentFixture<ListUserlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserlistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
