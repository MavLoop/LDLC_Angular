import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandDto } from '../_helpers/_dto/BrandDto';

const BRAND_API = 'http://localhost:8080/api/brand/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<BrandDto[]>(BRAND_API + 'all');
  }

  findById(id: number) {
    return this.http.get<BrandDto>(BRAND_API + 'id/' + id);
  }

  findByName(name: string) {
    return this.http.get<BrandDto>(BRAND_API + 'name/' + name);
  }

  save(name: String) {
    return this.http.post<BrandDto>(BRAND_API + 'add/' + name, '');
  }
}
