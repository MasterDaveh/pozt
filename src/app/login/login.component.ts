;import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username: string;
  APIurl: string;

  constructor(private ajax: AjaxService, private router: Router) {
    this.username = "";
    this.APIurl = 'http://cpv2api.com';
  }

  ngOnInit() {
    const usr = localStorage.getItem('user');
    if( usr ){
      this.router.navigate(['/home']);
    }
  }

  goHome(usr: string){
    localStorage.setItem('user', usr);
    this.router.navigate(['/home']);
  }

  login( usr: string ){
    let url = '';

    // if logging in with codepen:
    // - check that username is valid(not empty)
    if( usr.length === 0 ){
      console.log('Invalid username provided');
      return;
    }

    // - check existence of provided account
    if( usr !== 'host' ){

      url = `${ this.APIurl }/posts/published/${ usr }`;

      this
      .ajax.call(url)
      .subscribe( res => {
          if( res.error && res.error.indexOf('404') > -1 ){
            console.log('Invalid username provided');
          } else {
            this.goHome( usr );
          }
      }, err => console.log(err));
    } else {
      this.goHome( usr );
    }
  }

}
