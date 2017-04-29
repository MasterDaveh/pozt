import { Component } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  username: string;
  APIurl: string;

  constructor(private ajax: AjaxService, private router: Router) {
    this.username = "";
    this.APIurl = 'http://cpv2api.com';
  }


  login(){
    let url = '';
    
    // if logging in with codepen:
    // - check that username is valid(not empty)
    if( this.username.length === 0 ){
      console.log('Invalid username provided');
      return;
    }

    url = `${ this.APIurl }/posts/published/${ this.username }`;

    // - check existance of provided account
    this
      .ajax.call(url)
      .subscribe( res => {
          if( res.error && res.error.indexOf('404') > -1 ){
            console.log('Invalid username provided');
          } else {
            this.router.navigate(['/home']);
          }
      }, err => console.log(err));
  }

}
