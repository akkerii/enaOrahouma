import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from './purchase';

@Injectable({
  providedIn: 'root'
})
export class ServicePaymentService {

 
  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number) {
    return this.http.post<{ clientSecret: string }>('http://localhost:9099/api/stripe/create-payment-intent', { amount });
  }

  getCourse(CourseId : any){
    return this.http.get<{ 
      id: number,
      title: string,
      description: string,
      contenu: string,
      reactNumber: number,
      filePath: string,
      userId: number,
      fileType: string,
      fileContent: string,
      price: number
    }>('http://localhost:9099/purchase/cours/'+CourseId)
  }



  createPurchase(userId: number, courseId: number,paymentId:string) {
    return this.http.post('http://localhost:9099/purchase/create/'+userId+'/'+courseId+'/'+paymentId, {} , { responseType: 'text' });
  }


  getPurchases(){
    return this.http.get<Purchase[]>('http://localhost:9099/purchase/all')
  }
}
