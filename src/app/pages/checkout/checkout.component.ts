import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from 'src/app/shared/components/header/interfaces/stores.interface';
import { DataService } from '../products/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  model ={
  name:'',
  store:'',
  shippingAddress:'',
  city:''
  };
  isDelivery!: boolean;

  stores: Store[] = []

  constructor(private datasvc: DataService){ }

  ngOnInit(): void{
    this.getStores();
  }
  onPickupOrDelivery(value:boolean): void{
    this.isDelivery = false;
  }

  onSubmit(): void{
    console.log("Guardar")
  }

  private getStores(): void{
    this.datasvc.getStore()
    .pipe(
      tap((stores: Store[]) => this.stores = stores))
    .subscribe()
  }

}
