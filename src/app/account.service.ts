import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

url = "http://localhost:9099";

  getTotal(sellerId:number){
    return this.http.get<number>(this.url+"/api/stripe/seller/total/"+sellerId);

  }
}
