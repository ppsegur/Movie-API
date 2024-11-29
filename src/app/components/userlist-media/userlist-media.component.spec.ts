import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMediaComponent } from './userlist-media.component';

describe('UserlistMoviesComponent', () => {
  let component: UserListMediaComponent;
  let fixture: ComponentFixture<UserListMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
