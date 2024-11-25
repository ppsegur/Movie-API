import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistMoviesComponent } from './userlist-movies.component';

describe('UserlistMoviesComponent', () => {
  let component: UserlistMoviesComponent;
  let fixture: ComponentFixture<UserlistMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserlistMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlistMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
