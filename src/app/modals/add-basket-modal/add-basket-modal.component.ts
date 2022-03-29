import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-basket-modal',
  templateUrl: './add-basket-modal.component.html',
  styleUrls: ['./add-basket-modal.component.css']
})
export class AddBasketModalComponent implements OnInit {

  title!: string;
  message!: string;
  isSuccess!: boolean;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
