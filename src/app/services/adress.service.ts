import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiURL } from "../constants";
import { Address } from "../models/address";

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    apiPath = apiURL + 'address';

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }),
    };

    getAddresses(): Observable<Array<Address>> {
        return this.http.get<Array<Address>>(this.apiPath, this.httpOptions);
    }

    addAddress(data: Address) {
        return this.http.post(this.apiPath, data);
    }

    editAddress(data: Address): Observable<Address> {
        return this.http.put<Address>(this.apiPath + '/' + data.id, data);
    }

    deleteAddress(id: number) {
        return this.http.delete(this.apiPath + '/' + id);
    }
}