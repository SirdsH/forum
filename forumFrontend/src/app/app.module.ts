import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatFormFieldModule,
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        HttpClientModule,
        MatCardActions,
        MatCardContent,
        MatCardSubtitle,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        MatIcon
    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
