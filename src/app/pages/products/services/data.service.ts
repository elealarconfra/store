import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { DetailsOrder, Order } from 'src/app/shared/components/header/interfaces/order.interfaces';
import { Store } from 'src/app/shared/components/header/interfaces/stores.interface';
@Injectable({
  providedIn: 'root'
})

export class DataService{
  private apiURL = 'http://localhost:3000';
  constructor(private http:HttpClient){}

  getStore():Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiURL}/stores`)
  }

  saveOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${this.apiURL}/orders`, order);
  }

  saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder>{
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
  }

}
