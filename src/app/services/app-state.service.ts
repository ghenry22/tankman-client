import { inject, Injectable } from '@angular/core';
import { TankmanApiService } from './tankman-api.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tank } from '../models/tankman-types';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private api: TankmanApiService = inject(TankmanApiService);
  public tanks: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public measurements: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public schedulerEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public schedulerInterval: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {

  }

  async init() {
    this.api.setBaseUrl(this.getServerBaseUrl());
  }

  getServerBaseUrl() {
    return environment.SERVERBASEURL;
  }

  async getTanks() {
    const res = await lastValueFrom(this.api.getAllTanks());
    this.tanks.next(res);
  }

  async getMeasurements() {
    const res = await lastValueFrom(this.api.getAllMeasurements());
    this.measurements.next(res);
  }

  async isSensorAvailable(sensorId: number) {
    let isAvailable = true;

    this.tanks.getValue().forEach((tank: Tank) => {
      if(tank.sensorId == sensorId) {
        isAvailable = false;
      }
    });
    return isAvailable;
  }

  async createTank(tank: Tank) {
    // always store capacity in litres
    if(tank.capacityUnit === 'gallons') {
      tank.statedCapacity = tank.statedCapacity * 3.78541;
    }
    const res = await lastValueFrom(this.api.createTank(tank));
    await this.getTanks();
    return res;
  }

  async deleteTank(tank: Tank) {
    const res = await lastValueFrom(this.api.deleteTank(tank.id || 0));
    await this.getTanks();
    return res;
  }

  async updateTank(tank: Tank) {
    // always store capacity in litres
    if(tank.capacityUnit === 'gallons') {
      tank.statedCapacity = tank.statedCapacity * 3.78541;
    }
    const res = await lastValueFrom(this.api.updateTank(tank.id || 0, tank));
    await this.getTanks();
    return res;
  }

  async getSettings() {
    const res = await lastValueFrom(this.api.getSettings());
    return res;
  }

  async getSchedulerEnabled() {
    const res = await lastValueFrom(this.api.getSchedulerEnabled());
    this.schedulerEnabled.next(res.enabled);
    return res;
  }

  async setSchedulerEnabled(enabled: boolean) {
    const res = await lastValueFrom(this.api.setSchedulerEnabled(enabled));
    await this.getSchedulerEnabled();
    return res;
  }

  async getSchedulerInterval() {
    const res = await lastValueFrom(this.api.getSchedulerInterval());
    this.schedulerInterval.next(res.interval);
    return res;
  }

  async setSchedulerInterval(interval: number) {
    const res = await lastValueFrom(this.api.setSchedulerInterval(interval));
    await this.getSchedulerInterval();
    return res;
  }

}
