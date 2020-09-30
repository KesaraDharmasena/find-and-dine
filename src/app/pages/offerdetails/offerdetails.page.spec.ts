import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferdetailsPage } from './offerdetails.page';

describe('OfferdetailsPage', () => {
  let component: OfferdetailsPage;
  let fixture: ComponentFixture<OfferdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
