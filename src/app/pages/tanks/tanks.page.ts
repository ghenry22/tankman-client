import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, ModalController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonList, IonItem, IonLabel, IonText, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { AppStateService } from 'src/app/services/app-state.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CreateTankComponent } from 'src/app/components/create-tank/create-tank.component';
import { Tank } from 'src/app/models/tankman-types';


@Component({
  selector: 'app-tanks',
  templateUrl: 'tanks.page.html',
  styleUrls: ['tanks.page.scss'],
  standalone: true,
  imports: [IonButton, IonText, IonLabel, IonItem, IonList, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonFabButton, IonFab, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule]
})
export class TanksPage {
  public appStateService: AppStateService = inject(AppStateService);
  private utils: UtilsService = inject(UtilsService);
  private modalCtrl: ModalController = inject(ModalController);

  constructor() {
    addIcons({add});
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    await this.appStateService.getTanks();
  }

  async editTank(tank:Tank) {

  }

  async deleteTank(tank:Tank) {
      
  }

  async addTank() {
    if(this.appStateService.tanks.getValue().length === 2) {
      this.utils.showToastMessage('You can only have 2 tanks', 'error');
      return;
    };

    const createTankModal = await this.modalCtrl.create({
      component: CreateTankComponent,
      componentProps: {
        item: {}
      },
      cssClass: 'more-info-modal'
    });
    await createTankModal.present();

    const { data, role } = await createTankModal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

}
