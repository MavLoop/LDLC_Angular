import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDto } from '../_helpers/_dto/CategoryDto';

const CATEGORY_API = 'http://localhost:8080/api/category/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<CategoryDto[]>(CATEGORY_API + 'all');
  }

  findById(id: number) {
    return this.http.get<CategoryDto>(CATEGORY_API + 'id/' + id);
  }

  findByName(name: string) {
    return this.http.get<CategoryDto>(CATEGORY_API + 'name/' + name);
  }
}
