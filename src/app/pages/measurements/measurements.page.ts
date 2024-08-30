import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../components/explore-container/explore-container.component';

@Component({
  selector: 'app-measurements',
  templateUrl: 'measurements.page.html',
  styleUrls: ['measurements.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class MeasurementsPage {
  constructor() {}
}
