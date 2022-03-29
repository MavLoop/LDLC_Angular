import { Component, OnInit } from '@angular/core';
import { BasketDto } from 'src/app/_helpers/_dto/BasketDto';
import { ProductDto } from 'src/app/_helpers/_dto/ProductDto';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket!: BasketDto;
  total: number = 0;

  constructor(private basketService: BasketService) {
    this.loadBasket();
  }

  ngOnInit(): void {
  }

  loadBasket() {
    this.basketService.findUserBasket().subscribe({
      next: data => {
        this.basket = data;
        this.updateTotal();
      },
      error: (e) => console.error(e)
    });
  }

  updateTotal() {
    this.total = 0;
    for(let el of this.basket.products) {
      this.total += el.price;
    }
  }

  removeProduct(index: any) {
    this.basket.products.splice(index, 1);
    this.basketService.patchBasket(this.basket).subscribe({
      next: data => {this.basket = data; this.updateTotal()},
      error: (e) => console.error(e)
    })
  }
}
