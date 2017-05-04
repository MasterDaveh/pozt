import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';

interface UserProfile{
  nicename: string;
  username: string;
  avatar: string;
  location: string;
  bio: string;
  pro: string;
  followers: string;
  following: string;
  links: string[]
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.pug',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userInfo: UserProfile;
  loggedUser: string;
  APIurl: string;
  constructor(private route: ActivatedRoute, private ajax: AjaxService, private router: Router) {
    this.APIurl = 'http://cpv2api.com';
    this.userInfo = {
      nicename: '', username: '', avatar: '', location: '', bio: '', pro: '',
      followers: '', following: '', links: []
    };
  }

  ngOnInit() {
    this.loggedUser = localStorage.getItem('user');
    this.route.params.subscribe(params => {
      const usr = params.username;
      const url = `${ this.APIurl }/profile/${ usr }`;
      this.ajax.call(url).subscribe(info => {
        if( info.success == "true" ){
          this.userInfo = info.data;
        }
      });
    });
  }

  extractDomain(url: string){
    let tmp = url.split('//')[1];
    return tmp.split('/')[0];
  }

  openLink(url: string){
    window.open(url);
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/login/false']);
  }

}
