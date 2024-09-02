import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertController, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, ModalController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonList, IonItem, IonLabel, IonText, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { AppStateService } from 'src/app/services/app-state.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CreateTankComponent } from 'src/app/components/create-tank/create-tank.component';
import { Tank } from 'src/app/models/tankman-types';
import { EditTankComponent } from 'src/app/components/edit-tank/edit-tank.component';


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
  private alertController: AlertController = inject(AlertController);

  constructor() {
    addIcons({add});
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    await this.appStateService.getTanks();
  }

  async deleteTank(tank:Tank) {
    await this.showDeleteConfirmation(tank);
  }

  async showDeleteConfirmation(tank:Tank) {
    const alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          console.log('Alert confirmed');
          await this.appStateService.deleteTank(tank);
        },
      },
    ];
    const alert = await this.alertController.create({
      subHeader: 'Delete ' + tank.name + '?',
      message: 'Are you sure? deleting this tank will also delete all measurements associated with it.',
      buttons: alertButtons,
    });

    await alert.present();
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

  async editTank(tank: Tank) {

    const editTankModal = await this.modalCtrl.create({
      component: EditTankComponent,
      componentProps: {
        tank: tank
      },
      cssClass: 'more-info-modal'
    });
    await editTankModal.present();

    const { data, role } = await editTankModal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

}
