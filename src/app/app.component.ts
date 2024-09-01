import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppStateService } from './services/app-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  private appStateService: AppStateService = inject(AppStateService);

  constructor() {
    this.appStateService.init();
  }
}
