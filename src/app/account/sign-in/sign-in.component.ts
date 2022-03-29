import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorComponent } from 'src/app/modals/error/error.component';
import { UserDto } from 'src/app/_helpers/_dto/UserDto';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;
  bsModalRef!: BsModalRef;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder, private authService: AuthService,
    private tokenService: TokenStorageService, private route: Router,
    private bsModalService: BsModalService) {
    if (!!this.tokenService.getToken()) {
      this.route.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      btSubmit: ['']
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (v) => {
          this.isLoading = false;
          this.tokenService.saveToken(v);
          const user: UserDto = { id: v.id, username: v.username, email: v.email, role: v.roles[0]};
          this.tokenService.saveUser(user);
          this.route.navigate(['home']);
        },
        error: (e) => {
          this.isLoading = false;
          this.openErrorModal(e.error.message);
        },
      });
  }

  public openErrorModal(message: string) {
    const initialState = {
      'message': message
    };
    this.bsModalRef = this.bsModalService.show(ErrorComponent, { initialState });
  }
}
