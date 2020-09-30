import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NutritionsPage } from './nutritions.page';

describe('NutritionsPage', () => {
  let component: NutritionsPage;
  let fixture: ComponentFixture<NutritionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
