import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/_helpers/_dto/ProductDto';
import { UserDto } from 'src/app/_helpers/_dto/UserDto';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item!: ProductDto;
  user!: UserDto;

  constructor(private router: Router, private tokenService: TokenStorageService) {
    this.user = tokenService.getUser();
  }

  ngOnInit(): void {
  }

  viewItem(id: number) {
    this.router.navigate(['/product/'+id]);
  }

  editItem(id: number) {
    this.router.navigate(['/products/patch/' + id])
  }

}
