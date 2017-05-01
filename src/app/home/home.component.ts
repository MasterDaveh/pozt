import { Component, OnInit, OnChanges } from '@angular/core';
import { PostsService, Post } from '../services/posts.service';
import { RollingListItem } from '../directives/rolling-list.directive';
import { ScrollClassItem, ScrollClassDirective } from '../directives/scroll-class.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnChanges {
  posts: Post[];
  header: {
    avatar: string,
    username: string
  };
  rollingListModel: RollingListItem;
  scrollClassModel: ScrollClassItem;
  menuOpen: boolean;
  
  constructor(private postsHelper: PostsService) {
    this.rollingListModel = {
      onTopReaching: idx => this.header = this.setHeader(idx),
      onTopDeparting: idx => this.header = this.setHeader(idx),
      boundaryRatio: 0.7
    };
    this.scrollClassModel = { down: 'menu__down' };
    this.header = { avatar: '', username: '' };
    this.menuOpen = false;
  }

  // set the model for the rolling-list-header
  setHeader(idx: number){
    const obj = {
      avatar: this.posts[idx].user.avatar,
      username: this.posts[idx].user.username
    };
    return obj;
  }

  showMenu(){
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    this.postsHelper.init(() => {
      this.posts = this.postsHelper.getAll();
      this.header = this.setHeader(0);
    });
  }

  ngOnChanges() {

  }

}
