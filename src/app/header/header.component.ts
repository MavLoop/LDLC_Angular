import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserDto } from '../_helpers/_dto/UserDto';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  user!: UserDto;

  constructor(private tokenService: TokenStorageService, private route: Router) {
    this.route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.isConnected();
      }
    });
  }

  ngOnInit(): void {
    this.isConnected();
  }

  isConnected() {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenService.getUser();
    }
  }

  signOut() {
    this.tokenService.signOut();
    this.isConnected();
    this.route.navigate(['/home']);
  }
}
