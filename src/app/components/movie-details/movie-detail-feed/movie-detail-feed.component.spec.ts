import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailFeedComponent } from './movie-detail-feed.component';

describe('MovieDetailFeedComponent', () => {
  let component: MovieDetailFeedComponent;
  let fixture: ComponentFixture<MovieDetailFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
