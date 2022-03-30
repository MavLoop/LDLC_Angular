import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/_helpers/_dto/ProductDto';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  item!: string;
  dataSet!: ProductDto[];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.paramMap.subscribe(data => {
      let param = data.get('item')
      if (param !== null) {
        this.item = param;
        this.loadData();
      }
    })
  }

  ngOnInit(): void {
  }

  loadData() {
    this.productService.findByCategory(this.item).subscribe({
      next: data => {this.dataSet = data},
      error: (e) => console.error(e)
    });
  }
}
