import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonToolbar, IonTitle, IonButtons, IonButton, ModalController, IonList, IonItem, IonInput, IonLabel, IonModal, IonSelect, IonSelectOption, IonToggle } from "@ionic/angular/standalone";
import { Tank } from 'src/app/models/tankman-types';
import { AppStateService } from 'src/app/services/app-state.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-edit-tank',
  templateUrl: './edit-tank.component.html',
  styleUrls: ['./edit-tank.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonToggle, IonSelectOption, IonSelect, IonModal, IonLabel, IonInput, IonItem, IonList, IonButton, IonButtons, IonTitle, IonToolbar]
})
export class EditTankComponent  implements OnInit {
  @Input() tank!: Tank;

  public appStateService: AppStateService = inject(AppStateService);
  private modalCtrl: ModalController = inject(ModalController);
  private util: UtilsService = inject(UtilsService);

  public sensorInUse: boolean = false;

  public actionSheetOptions = {
    header: 'Each tankman supports 2 sensors',
    cssClass: 'custom-action-sheet'
  };

  constructor() { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async toggleIsRound(event:any) {
    this.tank.isRound = event.detail.checked;
  }

  async updateCapacityUnit(event:any) {
    this.tank.capacityUnit = event.detail.value;
  }

  async updateSensorId(event:any) {
    if(!await this.appStateService.isSensorAvailable(event.detail.value)) {
      this.sensorInUse = true;
      this.util.showToastMessage('Sensor is already assigned to another tank', 'error');
    } else {
      this.sensorInUse = false;
    }
    this.tank.sensorId = event.detail.value;
  }

  async updateTank() {
    if(!this.tank.name || !this.tank.location || !this.tank.height || !this.tank.sensorDistanceWhenFull || !this.tank.sensorId) {
      this.util.showToastMessage('All fields are required', 'error');
      return;
    }
    if(this.sensorInUse) {
      this.util.showToastMessage('Please select a different sensor ID', 'error');
      return;
    }

    if (!this.tank.isRound && this.tank.statedCapacity === 0) {
      this.util.showToastMessage('For tanks that are not round a stated capacity is required', 'error');
      return;
    }
    const res = await this.appStateService.updateTank(this.tank);
    if(res.id) {
      await this.util.showToastMessage('Tank updated successfully', 'success');
      this.modalCtrl.dismiss(res, 'confirm');
    }
  }

}
