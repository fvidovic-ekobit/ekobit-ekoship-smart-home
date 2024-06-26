import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiURL } from "../constants";
import { AddHome, EditHome, Home, HomeDetails } from "../models/home";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiPath = apiURL + 'home';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }),
  };

  getHomes(): Observable<Array<Home>> {
    return this.http.get<Array<Home>>(this.apiPath, this.httpOptions);
  }

  addHome(data: AddHome) {
    return this.http.post(this.apiPath, data);
  }

  editHome(id: number, data: EditHome): Observable<Home> {
    return this.http.put<Home>(this.apiPath + '/' + id, data);
  }

  deleteHome(id: number) {
    return this.http.delete(this.apiPath + '/' + id);
  }

  getHome(id: number): Observable<HomeDetails> {
    return this.http.get<HomeDetails>(this.apiPath + '/' + id, this.httpOptions);
  }
}