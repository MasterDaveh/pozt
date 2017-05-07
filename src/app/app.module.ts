import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AjaxService } from './services/ajax.service';
import { PostsService } from './services/posts.service';
import { RollingListItemDirective } from './directives/rolling-list-item.directive';
import { ScrollClassDirective } from './directives/scroll-class.directive';
import { RollingListHeaderDirective } from './directives/rolling-list-header.directive';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login/true', pathMatch: 'full' },
  { path: 'login/:redirect', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile/:username', component: ProfileComponent }
];

@NgModule({
  declarations: [ 
    AppComponent, LoginComponent, HomeComponent, RollingListItemDirective, ScrollClassDirective, RollingListHeaderDirective,
    ProfileComponent
  ],
  imports: [ 
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ AjaxService, PostsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
