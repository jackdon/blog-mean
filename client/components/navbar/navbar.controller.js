'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    // Navbar初始化关闭状态
    this.isCollapsed = true;
    this.menu = [
      {
        state: 'main.home',
        title: 'Home'
      },
      {
        state: 'main.blog',
        title: 'Blog'
      },
      {
        state: 'main.gallery',
        title: 'Gallery'
      },
      {
        state: 'main.about',
        title: 'About'
      }
    ];
  }

}

angular.module('snoopyApp')
  .controller('NavbarController', NavbarController);
