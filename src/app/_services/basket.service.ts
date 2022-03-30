import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasketDetailDto } from '../_helpers/_dto/BasketDetailDto';
import { BasketDto } from '../_helpers/_dto/BasketDto';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/basket/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }
  
  findUserBasket() {
    let user = this.tokenService.getUser();
    return this.http.get<BasketDto>(`${AUTH_API}user/${user.id}`);
  }

  addToBasket(userId: number, productId: number) {
    return this.http.post<BasketDto>(`${AUTH_API}user/${userId}/add/${productId}`, '');
  }

  incrementQuantity(id: number) {
    return this.http.post<BasketDetailDto>(`${AUTH_API}detail/${id}/plus`, '');
  }

  decrementQuantity(id: number) {
    return this.http.post<BasketDetailDto>(`${AUTH_API}detail/${id}/minus`, '');
  }

  deleteFromBasket(id: number) {
    return this.http.delete<BasketDetailDto>(`${AUTH_API}detail/${id}/delete`);
  }
}
