import { Component, ComponentRef, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {

  public modalRef!: BsModalRef;
  title!: string;
  message!: string;
  isSuccess!: boolean;

  constructor(public modalService: BsModalService) { }

  ngOnInit(): void {
    console.error(this.isSuccess);
  }
}
