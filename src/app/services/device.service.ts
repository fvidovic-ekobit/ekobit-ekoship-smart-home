import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiURL } from "../constants";
import { DeviceCreate, DeviceDetails, DeviceList, DeviceUpdate } from "../models/device";

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  apiPath = apiURL + 'device';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }),
  };

  getDevices(): Observable<Array<DeviceList>> {
    return this.http.get<Array<DeviceList>>(this.apiPath, this.httpOptions);
  }

  addDevice(data: DeviceCreate) {
    return this.http.post(this.apiPath, data);
  }

  editDevice(id: number, data: DeviceUpdate): Observable<DeviceDetails> {
    return this.http.put<DeviceDetails>(this.apiPath + '/' + id, data);
  }

  deleteDevice(id: number) {
    return this.http.delete(this.apiPath + '/' + id);
  }

  getDevice(id: number): Observable<DeviceDetails> {
    return this.http.get<DeviceDetails>(this.apiPath + '/' + id, this.httpOptions);
  }
}