import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDesignComponent } from './post-design.component';

describe('PostDesignComponent', () => {
  let component: PostDesignComponent;
  let fixture: ComponentFixture<PostDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
