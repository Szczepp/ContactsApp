import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact-list/contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { fakeBackendProvider } from './_helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    AddContactComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AddContactComponent,
    UpdateContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    fakeBackendProvider,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
