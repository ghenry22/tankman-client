import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanksPage } from './tanks.page';

describe('TanksPage', () => {
  let component: TanksPage;
  let fixture: ComponentFixture<TanksPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
