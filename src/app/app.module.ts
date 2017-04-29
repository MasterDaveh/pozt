import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AjaxService } from './services/ajax.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [ AppComponent, LoginComponent, HomeComponent ],
  imports: [ 
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ AjaxService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
