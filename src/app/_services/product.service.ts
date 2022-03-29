import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '../_helpers/_dto/ProductDto';
import { SaveProductDto } from '../_helpers/_dto/SaveProductDto';

const PRODUCT_API = 'http://localhost:8080/api/product/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findById(id: number) {
    return this.http.get<ProductDto>(PRODUCT_API + 'id/' + id);
  }

  findAll() {
    return this.http.get<ProductDto[]>(PRODUCT_API + 'all');
  }

  findByCategory(category: string) {
    return this.http.get<ProductDto[]>(PRODUCT_API + 'cat/' + category);
  }

  saveProduct(product: SaveProductDto) {
    return this.http.post<ProductDto>(PRODUCT_API + 'add', product);
  }
}
