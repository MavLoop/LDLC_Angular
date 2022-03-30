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
    for (let el of this.basket.basketDetails) {
      this.total += el.product.price * el.quantity;
    }
  }

  incrementQuantity(id: number) {
    this.basketService.incrementQuantity(id).subscribe({
      next: data => {
        let index = this.basket.basketDetails.findIndex(x => x.id === data.id);
        this.basket.basketDetails[index] = data;
        this.updateTotal();
      },
      error: e => console.log(e.message)
    })
  }

  decrementQuantity(id: number) {
    this.basketService.decrementQuantity(id).subscribe({
      next: data => {
        let index = this.basket.basketDetails.findIndex(x => x.id === data.id);
        if (data.quantity === 0) {
          this.basket.basketDetails.splice(index, 1);
        } else {
          this.basket.basketDetails[index] = data;
        }
        this.updateTotal();
      },
      error: e => console.log(e.message)
    })
  }

  removeProduct(id: number) {
    this.basketService.deleteFromBasket(id).subscribe({
      next: data => {
        let index = this.basket.basketDetails.findIndex(x => x.id === data.id);
        this.basket.basketDetails.splice(index, 1);
        this.updateTotal();
      },
      error: e => console.log(e.message)
    })
  }
}
