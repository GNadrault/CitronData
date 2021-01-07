import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { UserService } from '../../../domain/service/user.service';

const MENU: NbMenuItem[] = [
  {
    title: 'Recettes',
    icon: 'nb-e-commerce',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Statistiques',
    icon: 'nb-home',
    link: '/pages/iot-dashboard',
  }
];


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  client: Boolean = false;
  user: any;
  menu = MENU;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private menuService: NbMenuService, private us: UserService) {
  }

  ngOnInit() {
    this.us.currentUser.subscribe(user => this.client = user);
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
