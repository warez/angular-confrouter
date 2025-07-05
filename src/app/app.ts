import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ColorSchemeService} from './services/color-scheme.service';
import {UserManagerService} from 'ROOT/services/user-manager.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected title = 'My Title';

  constructor(private router: Router,
              public colorSchemeService: ColorSchemeService,
              private userManager: UserManagerService) {  }

  ngOnInit() {

    this.colorSchemeService.load();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => window.HSStaticMethods.autoInit(), 100);
      }
    });
  }

}
