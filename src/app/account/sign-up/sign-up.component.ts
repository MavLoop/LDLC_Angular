import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { SignUpModalComponent } from 'src/app/modals/sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;
  bsModalRef!: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  public openModalWithComponent(title: string, message: string, isSuccess: boolean) {
    /* this is how we open a Modal Component from another component */
    const initialState = {
      'title': title,
      'message': message,
      'isSuccess': isSuccess
    };
    this.bsModalRef = this.modalService.show(SignUpModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Fermer';
  }

  initForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, { validators: [this.validatePasswords] })
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.signupForm.get('username')?.value, this.signupForm.get('email')?.value, this.signupForm.get('passwords')?.get('password')?.value).subscribe({
      next: data => {
        console.log(data);
        this.openModalWithComponent('Votre compte a bien été enregistré', 'Vous pouvez désormais vous connecter', true);
        this.initForm();
      },
      error: (e) => {
        this.openModalWithComponent('Une erreur est survenue', e.error.message, false);
      }
    });
  }

  validatePasswords(c: AbstractControl): any {
    let pwd = c.get('password')?.value;
    let pwd2 = c.get('passwordConfirm')?.value;
    if (pwd == pwd2) {
      return null;
    }
    return { invalid: true };
  }
}
