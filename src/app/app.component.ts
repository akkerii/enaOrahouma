import { Component, OnInit } from '@angular/core';
import { ServicePaymentService } from './service-payment.service';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // to add
  isLoading$: Observable<boolean>;
  title:string="";

  constructor(private router: Router, private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoadingObservable();

    // Subscribe to router events to control the loader
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();  // Show loader on start of navigation
        console.log('Navigation Start');
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();  // Hide loader when navigation ends or fails
        console.log('Navigation End/Cancel/Error');
      }
    });
  }
  

}
