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
  // number of pics before posts are updated
  // if boundary === 2 then when activeindex is === posts count - 2
  // we fetch new posts
  refreshBoundary: number;
  fetchingPosts: boolean;
  // number of rendered elements
  boundary: number;
  lastActiveIndex: number;
  isSearchBarVisible: boolean;

  onTopReaching(idx: number, self: HomeComponent){
    if( self.activeIndex === idx ) return;
    self.activeIndex = idx;

    if( self.activeIndex === (self.posts.length - self.refreshBoundary) ){
      if( !self.fetchingPosts ){
        self.fetchingPosts = true;
        self.postsHelper.refresh(newPosts => {
          self.fetchingPosts = false;
          self.posts.push( ...newPosts );
        });
      }
    }
  }

  getActiveState = idx => idx === this.activeIndex;

  goToProfile(username?: string){
    let usr = username? username : localStorage.getItem('user');
    this.router.navigate(['/profile', usr]);
  } 

  showMenu(){
    this.menuOpen = !this.menuOpen;
  }

  showPost(url: string){
    window.open(url, '_blank');
  }

  showSearchBar(){
    this.isSearchBarVisible = true;
  }

  hideSearchBar(){
    this.isSearchBarVisible = false;
  }
  
  constructor(private postsHelper: PostsService, private router: Router) {}

  ngOnInit() {
    this.rollingListItemModel = {
      onTopReaching: idx => this.onTopReaching(idx, this),
      boundaryRatio: 0.75
    };
    this.scrollClassModel = { down: 'menu__down' };
    this.header = { avatar: '', username: '' };
    this.menuOpen = false;
    this.activeIndex = 0;
    this.user = localStorage.getItem('user');
    this.refreshBoundary = 3;
    this.boundary = 10;
    this.lastActiveIndex = this.activeIndex;
    this.fetchingPosts = false;
    this.isSearchBarVisible = false;

    this.postsHelper.init( _ => {
      this.posts = this.postsHelper.getAll();
    });
  }

}
