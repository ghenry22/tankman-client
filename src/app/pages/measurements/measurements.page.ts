import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-measurements',
  templateUrl: 'measurements.page.html',
  styleUrls: ['measurements.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class MeasurementsPage {
  public appStateService: AppStateService = inject(AppStateService);

  constructor() {
    this.initData();
  }

  async initData() {
    await this.appStateService.getMeasurements();
  }
}
