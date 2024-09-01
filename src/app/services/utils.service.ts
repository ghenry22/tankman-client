import { inject, Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular/standalone";


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private toastCtrl: ToastController = inject(ToastController);

  constructor() { }

  isoDateToEpoch(isoDate: string): number {
    return new Date(isoDate).getTime();
  }

  dateToEpoch(date: Date): number {
    return date.getTime();
  }

  epochToDate(epoch: number): Date {
    return new Date(epoch);
  }

  epochToIsoDate(epoch: number): string {
    return new Date(epoch).toISOString();
  }

  async showToastMessage(message: string, type: 'success' | 'error') {
    const toast = await this.toastCtrl.create({
      message: message,
      color: type === 'success' ? 'primary' : 'danger',
      position: 'top',
      duration: 4000
    });
    toast.present();
  }
}
