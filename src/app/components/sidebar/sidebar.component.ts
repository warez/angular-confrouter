import {Component, OnInit} from '@angular/core';
import {SidebarManager} from 'ROOT/services/core/sidebar-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, public sidebarManager: SidebarManager) {}

  ngOnInit() {
  }
}
