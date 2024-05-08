import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-seller',
  templateUrl: './account-seller.component.html',
  styleUrls: ['./account-seller.component.css']
})
export class AccountSellerComponent implements OnInit{
constructor(private accountservice:AccountService){}

total:number = 0 ;
  ngOnInit(): void {

    this.accountservice.getTotal(1).subscribe((total) => {
      this.total = total;
  });
  }
  

}
