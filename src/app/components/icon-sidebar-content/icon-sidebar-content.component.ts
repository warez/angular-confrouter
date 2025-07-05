import { Component } from '@angular/core';
import {SidebarManager} from 'ROOT/services/core/sidebar-manager.service';

@Component({
  selector: 'icon-sidebar-content',
  standalone: false,
  templateUrl: './icon-sidebar-content.component.html',
  styleUrl: './icon-sidebar-content.component.scss'
})
export class IconSidebarContentComponent {

  constructor(public sidebarManager: SidebarManager) {

  }


}
