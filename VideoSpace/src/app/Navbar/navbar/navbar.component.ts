import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iAuthResponse } from '../../Models/i-auth-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isCollapsed = true;
  isLoggedIn: boolean = false;

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user: iAuthResponse | null) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authSvc.logout();
  }
}
