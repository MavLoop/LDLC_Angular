import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent implements OnInit {

  title!: string;
  function!: string;
  catForm!: FormGroup;
  elForm!: FormGroup;

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.catForm = this.fb.group({
      catName: ['', Validators.required]
    });

    this.elForm = this.fb.group({
      elName: ['', Validators.required],
      elDesc: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.function === 'element') {
      this.triggerEventElement(this.elForm.get('elName')?.value, this.elForm.get('elDesc')?.value);
    } else if(this.function == 'category') {
      this.triggerEventCategory(this.catForm.get('catName')?.value);
    }
    this.bsModalRef.hide();
  }

  triggerEventElement(name: string, desc: string) {
    this.event.emit({ name: name, desc: desc });
  }

  triggerEventCategory(name: string) {
    this.event.emit({ name: name, desc: null });
  }

}
