import {AfterViewInit, Component} from '@angular/core';
import {SidebarManager} from 'ROOT/services/core/sidebar-manager.service';
import {ColorSchemeService} from 'ROOT/services/color-scheme.service';
import {UserManagerService} from 'ROOT/services/user-manager.service';

declare var HSDropdown: any;

@Component({
  selector: 'main-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public sidebarManager: SidebarManager,
              public colorSchemeService: ColorSchemeService,
              public userManager: UserManagerService) {

  }

  public logout() {
    this.userManager.logout();
  }

}
