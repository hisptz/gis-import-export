import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContentsComponent } from './file-contents.component';

describe('FileContentsComponent', () => {
  let component: FileContentsComponent;
  let fixture: ComponentFixture<FileContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
