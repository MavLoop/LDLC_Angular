import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddBrandModalComponent } from 'src/app/modals/add-brand-modal/add-brand-modal.component';
import { AddProductModalComponent } from 'src/app/modals/add-product-modal/add-product-modal.component';
import { ErrorComponent } from 'src/app/modals/error/error.component';
import { SuccessComponent } from 'src/app/modals/success/success.component';
import { BrandDto } from 'src/app/_helpers/_dto/BrandDto';
import { CategoryDto } from 'src/app/_helpers/_dto/CategoryDto';
import { ProductDto } from 'src/app/_helpers/_dto/ProductDto';
import { SaveProductDto } from 'src/app/_helpers/_dto/SaveProductDto';
import { BrandService } from 'src/app/_services/brand.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  arg!: string;
  id!: number;
  productForm!: FormGroup;
  specs: { [k: string]: { [k: string]: string } } = {};
  obj: Object = {};
  bsModalRef!: BsModalRef;
  eventRes!: Object;
  brands!: BrandDto[];
  categories!: CategoryDto[];

  constructor(private fb: FormBuilder, private bsModalService: BsModalService, private route: ActivatedRoute,
    private brandService: BrandService, private categoryService: CategoryService, private productService: ProductService) {
    this.route.paramMap.subscribe(param => {
      let p = param.get('action');
      if (p !== null) {
        this.arg = p;
        if (p === 'patch') {
          let i = param.get('id');
          if (i !== null) {
            this.id = parseInt(i);
          }
        }
      }
    });
    this.initBrands();
    this.initCategories();
    this.initFormFromArgument();
  }

  ngOnInit(): void {
  }

  initFormFromArgument() {
    if (this.arg === 'add') {
      this.initForm('', 0, 0, '', '', '', '');
    } else {
      this.productService.findById(this.id).subscribe({
        next: data => {
          this.initForm(data.name, data.price, data.stock, data.description, data.brand.name, data.category.name, data.image);
          this.specs = JSON.parse(data.specifications);
        },
        error: e => console.error(e.message)
      })
    }
  }

  initForm(title: string, price: number, stock: number, description: string, brand: string, category: string, image: string) {
    this.productForm = this.fb.group({
      title: [title, Validators.required],
      price: [price, Validators.required],
      stock: [stock, Validators.required],
      description: [description, Validators.required],
      brand: [brand, [Validators.required, this.brandValidator]],
      category: [category, [Validators.required, this.categoryValidator]],
      image: [image, Validators.required]
    });
  }

  addElement(key: string) {
    this.openProductModalWithComponent('Ajouter un élément', 'L\'élément', 'element', key);
  }

  addCategory() {
    this.openProductModalWithComponent('Ajouter une catégorie', 'La catégorie', 'category', null);
  }

  addBrand() {
    this.openBrandModalWithComponent();
  }

  deleteContent(category: string, spec: string | null) {
    if (spec === null) {
      delete this.specs[category];
    } else {
      delete this.specs[category][spec]
    }
  }

  initBrands() {
    this.brandService.findAll().subscribe({
      next: value => this.brands = value,
      error: (e) => console.error(e)
    });
  }

  initCategories() {
    this.categoryService.findAll().subscribe({
      next: value => {
        this.categories = value
      },
      error: (e) => console.error(e)
    });
  }

  onSubmitSave() {
    const product: SaveProductDto = {
      name: this.productForm.get('title')?.value,
      brand: this.productForm.get('brand')?.value,
      price: this.productForm.get('price')?.value,
      description: this.productForm.get('description')?.value,
      stock: this.productForm.get('stock')?.value,
      specifications: JSON.stringify(this.specs),
      category: this.productForm.get('category')?.value,
      image: this.productForm.get('image')?.value
    }
    this.productService.saveProduct(product).subscribe({
      next: data => {
        this.openSuccessModal('L\'artice a bien été ajouté au catalogue !');
        this.initFormFromArgument();
        this.specs = {};
      },
      error: e => this.openErrorModal(e.error.message)
    });
  }

  onSubmitPatch() {
    const brand = this.brands.find(x => x.name === this.productForm.get('brand')?.value);
    const category = this.categories.find(x => x.name === this.productForm.get('category')?.value);
    if (brand !== undefined && category !== undefined) {
      const product: ProductDto = {
        id: this.id,
        name: this.productForm.get('title')?.value,
        description: this.productForm.get('description')?.value,
        brand: brand,
        price: this.productForm.get('price')?.value,
        specifications: JSON.stringify(this.specs),
        image: this.productForm.get('image')?.value,
        stock: this.productForm.get('stock')?.value,
        category: category
      }
      this.productService.updateProduct(product).subscribe({
        next: () => {
          this.openSuccessModal('L\'artice a bien été ajouté au catalogue !');
          this.initFormFromArgument();
          this.specs = {};
        },
        error: e => console.error(e.message)
      })
    }
  }

  brandValidator(c: AbstractControl): any {
    if (c.value !== '') {
      return null;
    } else {
      return 'invalid';
    }
  }

  categoryValidator(c: AbstractControl): any {
    if (c.value !== '') {
      return null;
    } else {
      return 'invalid';
    }
  }

  public openProductModalWithComponent(title: string, message: string, func: string, key: any) {
    const initialState = {
      'title': title,
      'message': message,
      'function': func
    };
    this.bsModalRef = this.bsModalService.show(AddProductModalComponent, { initialState });

    this.bsModalRef.content.event.subscribe((res: { name: string, desc: string }) => {
      if (key === null) {
        this.specs[res.name] = {};
      } else {
        let test = JSON.stringify(this.specs[key]);
        if (test.length === 2) {
          test = test.substring(0, test.length - 1) + '"' + res.name + '":"' + res.desc + '"}';
        } else {
          test = test.substring(0, test.length - 1) + ',"' + res.name + '":"' + res.desc + '"}';
        }
        console.log(test);
        console.log('parsed', JSON.parse(test));
        this.specs[key] = JSON.parse(test);
      }
    });
  }

  public openBrandModalWithComponent() {
    this.bsModalRef = this.bsModalService.show(AddBrandModalComponent);

    this.bsModalRef.content.event.subscribe((res: any) => {
      if (res === 'refresh') {
        this.initBrands();
      }
    });
  }

  public openErrorModal(message: string) {
    const initialState = {
      'message': message
    };
    this.bsModalRef = this.bsModalService.show(ErrorComponent, { initialState });
  }

  public openSuccessModal(message: string) {
    const initialState = {
      'message': message
    };
    this.bsModalRef = this.bsModalService.show(SuccessComponent, { initialState });
  }
}