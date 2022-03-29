import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  patchBasket(basket: BasketDto) {
    return this.http.patch<BasketDto>(`${AUTH_API}patch`, basket);
  }

  addToBasket(userId: number, productId: number) {
    return this.http.post<BasketDto>(`${AUTH_API}user/${userId}/add/${productId}`, '');
  }
}
