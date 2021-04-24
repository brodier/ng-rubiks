import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './board/board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'brodier.eu.auth0.com',
      clientId: 'lAzNjpAgoxPlWxhq0P2E0EioQOPifO3A'
    }),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
