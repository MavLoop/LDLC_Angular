import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { AddBasketModalComponent } from 'src/app/modals/add-basket-modal/add-basket-modal.component';
import { ErrorComponent } from 'src/app/modals/error/error.component';
import { ProductDto } from 'src/app/_helpers/_dto/ProductDto';
import { UserDto } from 'src/app/_helpers/_dto/UserDto';
import { BasketService } from 'src/app/_services/basket.service';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id!: number;
  product!: ProductDto;
  message: string = '';
  bsModalRef!: BsModalRef;
  user!: UserDto;
  obj!: Object;

  constructor(private router: Router, private route: ActivatedRoute,
    private productService: ProductService, private basketService: BasketService,
    private tokenService: TokenStorageService, private bsModalService: BsModalService) {
    this.user = tokenService.getUser();
    this.route.paramMap.subscribe(data => {
      let param = data.get('id');
      if (param !== null) {
        this.id = parseInt(param);
        this.requestProduct();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {
    
  }

  requestProduct() {
    this.productService.findById(this.id).subscribe({
      next: (data) => {
        this.product = data;
        this.obj = JSON.parse(this.product.specifications);
      },
      error: (e) => this.openErrorModal(e.message)
    });
  }

  addToBasket(product: ProductDto) {
    if (!this.tokenService.isConnected()) {
      this.openModalWithComponent('Attention', 'Vous devez être connecté pour ajouter un produit au panier', false);
    } else {
      this.basketService.addToBasket(this.user.id, product.id).subscribe({
        next: () => this.openModalWithComponent('Produit ajouté !', 'Vous pouvez désormais passer commande ou continuer vos achats', true),
        error: (e) => this.openErrorModal(e.message)
      });
    }
  }

  public openModalWithComponent(title: string, message: string, isSuccess: boolean) {
    const initialState = {
      'title': title,
      'message': message,
      'isSuccess': isSuccess
    };
    this.bsModalRef = this.bsModalService.show(AddBasketModalComponent, { initialState });
  }

  public openErrorModal(message: string) {
    const initialState = {
      'message': message
    };
    this.bsModalRef = this.bsModalService.show(ErrorComponent, { initialState });
  }
}
