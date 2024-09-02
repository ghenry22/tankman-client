import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonInput, IonToggle, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect, IonSelectOption]
})
export class SettingsPage implements OnInit {
  public appStateService: AppStateService = inject(AppStateService);
  public schedulerEnabled: boolean = false;
  public schedulerInterval: number = 0;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    await this.appStateService.getSchedulerEnabled();
    await this.appStateService.getSchedulerInterval();
    this.schedulerEnabled = this.appStateService.schedulerEnabled.getValue();
    this.schedulerInterval = this.appStateService.schedulerInterval.getValue();
  }

  async updateSchedulerEnabled(event: any) {
    console.log('updateSchedulerEnabled');
    await this.appStateService.setSchedulerEnabled(event.detail.checked);
  }

  async updateSchedulerInterval(event: any) {
    console.log('updateSchedulerInterval');
    await this.appStateService.setSchedulerInterval(event.detail.value);
  }


}
