import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BrandService } from 'src/app/_services/brand.service';
import { ErrorComponent } from '../error/error.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-add-brand-modal',
  templateUrl: './add-brand-modal.component.html',
  styleUrls: ['./add-brand-modal.component.css']
})
export class AddBrandModalComponent implements OnInit {

  brandForm!: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalService: BsModalService, public bsModalRef: BsModalRef, private fb: FormBuilder, private brandService: BrandService) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.brandService.save(this.brandForm.get('brandName')?.value).subscribe({
      next: data => {
        this.openSuccessModal('La marque a bien été ajoutée.');
        this.triggerEventRefresh();
      },
      error: e => this.openErrorModal(e.error)
    })
    this.bsModalRef.hide();
  }

  initForm() {
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required]
    });
  }

  triggerEventRefresh() {
    this.event.emit('refresh');
  }

  public openSuccessModal(message: string) {
    /* this is how we open a Modal Component from another component */
    const initialState = {
      'message': message
    };
    this.bsModalRef = this.bsModalService.show(SuccessComponent, { initialState });
  }

  public openErrorModal(message: string) {
    /* this is how we open a Modal Component from another component */
    const initialState = {
      'message': message
    };
    this.bsModalRef = this.bsModalService.show(ErrorComponent, { initialState });
  }
}
