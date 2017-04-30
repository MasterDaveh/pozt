import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';

export class Post {
  constructor(){}
  
  title: string;
  content: string;
  link: string;
  views: string;
  loves: string;
  comments: string;
  user: Object;
  lastUpdated: number;
}

@Injectable()
export class PostsService {
  posts: Post[];
  apiURL: string;
  usr: string;
  
  constructor(private ajax: AjaxService){
    this.apiURL = 'http://cpv2api.com';
    this.usr = localStorage.getItem('user');
  }

  getAll = () => this.posts;

  onInitialFetchEnd(cb: Function){
    this.posts = this.posts.sort((current: Post, next: Post) => {
      if( current.lastUpdated >= next.lastUpdated ){
        return 1;
      } else {
        return -1;
      }
    });
    cb();
  }

  init(done: Function) {
    let url = this.apiURL;
    let self = this;

    if( this.usr !== 'host' ){
      url += `/followers/${ this.usr }`; 
      // first I get all the followers of the user
      this
        .ajax.call(url)
        .subscribe( followers => {
          // loose comparison as followers.success could be a string
          if( followers.success == true ){
            const flwCount = followers.length;
            let idx = 0;
            // for each follower get his posts
            followers.data.forEach( flw => {
              url = `${ this.apiURL }/published/`;
              this
                .ajax.call(url)
                .subscribe( posts => {
                  self.posts.push( posts );
                  if( idx === flwCount ){
                    this.onInitialFetchEnd(done);
                  }
                  idx++;
                });
            });
          }
        });
    }
  }

}