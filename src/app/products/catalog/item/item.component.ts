import { Component, Input, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/_helpers/_dto/ProductDto';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item!: ProductDto;

  constructor() { }

  ngOnInit(): void {
  }

}
