import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/components/header/interfaces/order.interfaces';
import { Store } from 'src/app/shared/components/header/interfaces/stores.interface';
import { Product } from '../products/interface/product.interfaces';
import { DataService } from '../products/services/data.service';
import { ShoppingCartService } from '../products/services/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  implements OnInit{
  model ={
  name:'Leonardo',
  store:'',
  shippingAddress:'',
  city:''
  };
  isDelivery = true;
  cart: Product[] = []
  stores: Store[] = []

  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router) {}

  ngOnInit(): void{
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  onPickupOrDelivery(value:boolean): void{
    this.isDelivery = value;
  }

  onSubmit({value: formData}: NgForm): void{
    console.log('Guardar', formData);
    const data: Order ={
      ... formData,
      date: this.getCurrentDay(),
      pickup: this.isDelivery,
    }

    this.dataSvc.saveOrder(data)
      .pipe(
        tap(res => console.log('Order ->', res)),
        switchMap(({id:orderId}) =>{
          const details = this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({details, orderId});
        }),
        tap(() =>this.router.navigate(['/checkout/thank-you-page']))
      )
      .subscribe();

  }

  private getStores(): void{
    this.dataSvc.getStore()
    .pipe(
      tap((stores: Store[]) => this.stores = stores))
    .subscribe()
  }

  private getCurrentDay(): string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(){
    const details: Details[] =[];
    this.cart.forEach((product: Product) => {
      const {id:productId, name:productName, qty:quantity, stock:productStock} = product;
      details.push({productId, productName, quantity})
    })
    return details;
  }

  private getDataCart():void{
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[])=> this.cart = products)
    )
    .subscribe()
  }
}
