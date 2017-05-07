import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';

export class Post {
  constructor(){}
  
  title: string;
  content: string;
  fullContent: string;
  link: string;
  views: string;
  loves: string;
  comments: string;
  user: {
    nicename: string,
    username: string,
    avatar: string
  };
  lastUpdated: number;
}

@Injectable()
export class PostsService {
  posts: Post[];
  apiURL: string;
  usr: string;
  pageIndex: number;
  
  constructor(private ajax: AjaxService){
    this.apiURL = 'http://cpv2api.com/posts/picks';
    this.usr = localStorage.getItem('user');
    this.posts = [];
    this.pageIndex = 1;
  }

  getAll = () => this.posts;

  private onFetchEnd(done: Function, posts: Post[]){
    done(posts);
  }

  private fetchPosts(done: Function){
    let url = this.apiURL;
    let self = this;

    url += `?page=${ this.pageIndex }`;
    this
      .ajax.call(url)
      .subscribe( posts => {
        if( posts.success == "true" ){
          this.posts.push(...posts.data);
          this.onFetchEnd(done, posts.data);
        }
      });
  }

  refresh(done: Function){
    this.pageIndex++;
    this.fetchPosts(done);
  }

  init(done: Function) {
    this.fetchPosts(done);
  }

}