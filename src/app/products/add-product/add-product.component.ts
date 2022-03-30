import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddBrandModalComponent } from 'src/app/modals/add-brand-modal/add-brand-modal.component';
import { AddProductModalComponent } from 'src/app/modals/add-product-modal/add-product-modal.component';
import { ErrorComponent } from 'src/app/modals/error/error.component';
import { SuccessComponent } from 'src/app/modals/success/success.component';
import { BrandDto } from 'src/app/_helpers/_dto/BrandDto';
import { CategoryDto } from 'src/app/_helpers/_dto/CategoryDto';
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

  productForm!: FormGroup;
  specsMap: Map<string, Map<string, string>> = new Map();
  obj: Object = {};
  bsModalRef!: BsModalRef;
  eventRes!: Object;
  brands!: BrandDto[];
  categories!: CategoryDto[];
  product: SaveProductDto = {
    name: '',
    brand: '',
    price: 0,
    description: '',
    stock: 0,
    specifications: undefined,
    category: '',
    image: ''
  }
  brand!: BrandDto;

  constructor(private fb: FormBuilder, private bsModalService: BsModalService,
    private brandService: BrandService, private categoryService: CategoryService, private productService: ProductService) {
    this.initBrands();
    this.initCategories();
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', [Validators.required, this.brandValidator]],
      category: ['', [Validators.required, this.categoryValidator]],
      image: ['', Validators.required]
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
    if(spec === null) {
      this.specsMap.delete(category);
    } else {
      this.specsMap.get(category)?.delete(spec);
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
      next: value => this.categories = value,
      error: (e) => console.error(e)
    });
  }

  onSubmit() {
    this.product.name = this.productForm.get('title')?.value;
    this.product.brand = this.productForm.get('brand')?.value;
    this.product.price = this.productForm.get('price')?.value;
    this.product.stock = this.productForm.get('stock')?.value;
    this.product.description = this.productForm.get('description')?.value;
    this.product.specifications = this.translateMapToObject();
    this.product.category = this.productForm.get('category')?.value;
    this.product.image = this.productForm.get('image')?.value;
    this.productService.saveProduct(this.product).subscribe({
      next: data => {
        this.openSuccessModal('L\'artice a bien été ajouté au catalogue !');
        this.initForm();
        this.specsMap = new Map();
      },
      error: e => this.openErrorModal(e.error.message)
    });
  }

  translateMapToObject() {
    let obj: { [k: string]: any } = {};
    console.log('json object', JSON.stringify(Object.fromEntries(this.specsMap.entries())));
    for (let key of this.specsMap.keys()) {
      let subObj: { [k: string]: string | undefined } = {};
      let iterable = this.specsMap.get(key)?.keys();
      if (iterable !== undefined) {
        for (let subKey of iterable) {
          subObj[subKey] = this.specsMap.get(key)?.get(subKey);
        }
      }
      obj[key] = subObj;
    }
    return JSON.stringify(obj);
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
    /* this is how we open a Modal Component from another component */
    const initialState = {
      'title': title,
      'message': message,
      'function': func
    };
    this.bsModalRef = this.bsModalService.show(AddProductModalComponent, { initialState });

    this.bsModalRef.content.event.subscribe((res: any) => {
      if (key === null) {
        this.specsMap.set(res.name, new Map<string, string>());
      } else {
        this.specsMap.get(key)?.set(res.name, res.desc);
      }
    });
  }

  public openBrandModalWithComponent() {
    /* this is how we open a Modal Component from another component */
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