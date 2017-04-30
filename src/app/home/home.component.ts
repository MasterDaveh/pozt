import { Component, OnInit, OnChanges } from '@angular/core';
import { PostsService, Post } from '../services/posts.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnChanges {
  posts: Post[];
  constructor(private postsHelper: PostsService) { }

  ngOnInit() {
    this.postsHelper.init(() => {
      this.posts = this.postsHelper.getAll();
    });
  }

  ngOnChanges() {

  }

}
