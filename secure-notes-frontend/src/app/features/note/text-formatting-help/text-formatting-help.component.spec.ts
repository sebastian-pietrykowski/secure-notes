import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFormattingHelpComponent } from './text-formatting-help.component';

describe('TextFormattingHelpComponent', () => {
  let component: TextFormattingHelpComponent;
  let fixture: ComponentFixture<TextFormattingHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFormattingHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextFormattingHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
