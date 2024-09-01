import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TankmanApiService {
  private http = inject(HttpClient);
  private baseUrl = '/'; // Base URL for the API

  constructor() { }

  setBaseUrl(url: string) {
    this.baseUrl = url + '/';
  }

  // Tanks Endpoints
  getAllTanks(): Observable<any> {
    return this.http.get(`${this.baseUrl}tanks`);
  }

  createTank(tank: any): Observable<any> {
    return this.http.post(`${this.baseUrl}tanks`, tank, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getTankById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tanks/${id}`);
  }

  updateTank(id: number, tank: any): Observable<any> {
    return this.http.put(`${this.baseUrl}tanks/${id}`, tank, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteTank(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}tanks/${id}`);
  }

  // Measurements Endpoints
  getAllMeasurements(): Observable<any> {
    return this.http.get(`${this.baseUrl}measurements`);
  }

  createMeasurement(measurement: any): Observable<any> {
    return this.http.post(`${this.baseUrl}measurements`, measurement, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getMeasurementById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}measurements/${id}`);
  }

  updateMeasurement(id: number, measurement: any): Observable<any> {
    return this.http.put(`${this.baseUrl}measurements/${id}`, measurement, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteMeasurement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}measurements/${id}`);
  }

  // Data Endpoints
  getLatestMeasurementByTankId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}data/latestmeasurementbytankid/${id}`);
  }

  getAllMeasurementsByTankId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}data/allmeasurementsbytankid/${id}`);
  }

  getLiveMeasurementByTankId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}data/livemeasurementbytankid/${id}`);
  }

  // Health Check Endpoint
  getHealthStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}health/status`);
  }
}