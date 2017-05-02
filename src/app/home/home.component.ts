import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService, Post } from '../services/posts.service';
import { RollingListItem, RollingListItemDirective } from '../directives/rolling-list-item.directive';
import { RollingListHeaderDirective } from '../directives/rolling-list-header.directive';
import { ScrollClassItem, ScrollClassDirective } from '../directives/scroll-class.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  header: {
    avatar: string,
    username: string
  };
  rollingListItemModel: RollingListItem;
  scrollClassModel: ScrollClassItem;
  menuOpen: boolean;
  activeIndex: number;
  user: string;

  onTopReaching(idx: number, self: HomeComponent){
    self.activeIndex = idx;
  }

  getActiveState = idx => idx === this.activeIndex;

  goToProfile(username?: string){
    let usr = username? username : localStorage.getItem('user');
    this.router.navigate(['/profile', usr]);
  } 
  
  constructor(private postsHelper: PostsService, private router: Router) {
    this.rollingListItemModel = {
      onTopReaching: idx => this.onTopReaching(idx, this),
      boundaryRatio: 0.7
    };
    this.scrollClassModel = { down: 'menu__down' };
    this.header = { avatar: '', username: '' };
    this.menuOpen = false;
    this.activeIndex = 0;
    this.user = localStorage.getItem('user');
  }

  showMenu(){
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    this.postsHelper.init(() => {
      this.posts = this.postsHelper.getAll();
    });
  }

}
