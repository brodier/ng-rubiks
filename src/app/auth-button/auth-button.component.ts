import { Component, Inject } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styles: [],
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ returnTo: this.document.location.origin });
  }
}
