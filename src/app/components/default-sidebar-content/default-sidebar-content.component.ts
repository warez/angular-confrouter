import {Component, OnInit} from '@angular/core';
import {SidebarManager} from 'ROOT/services/core/sidebar-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'default-sidebar-content',
  standalone: false,
  templateUrl: './default-sidebar-content.component.html',
  styleUrl: './default-sidebar-content.component.scss'
})
export class DefaultSidebarContentComponent implements OnInit {

  public active : string = "!text-blue-600 dark:!text-blue-400 !bg-blue-50 dark:!bg-gray-800";
  constructor(public sidebarManager: SidebarManager, private router: Router) {
  }

  ngOnInit() {

  }

}
