import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, pairwise} from 'rxjs';
import {BreadcrumbConfig} from 'ROOT/model/BreadcrumbConfig';
import {RouteUtilService} from 'ROOT/services/core/route-util.service';

@Component({
  selector: 'breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  breadcrumbs: BreadcrumbConfig[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private routeUtil: RouteUtilService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe(([prev, curr]: [NavigationEnd, NavigationEnd]) => {
        const prevUrl = prev.urlAfterRedirects.split('(')[0]; // rimuove gli outlet secondari
        const currUrl = curr.urlAfterRedirects.split('(')[0];

        if (prevUrl !== currUrl || this.breadcrumbs.length === 0) {
          this.breadcrumbs = this.buildBreadcrumb(this.route.root);
        }
      });
  }

  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbConfig[] = []): BreadcrumbConfig[] {
    const children: ActivatedRoute[] = route.children;

    for (let child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const params = child.snapshot.params;
      const config = child.snapshot.data['breadcrumbConfig'] as BreadcrumbConfig[] | undefined;

      if (config) {
        config.forEach(item => {
          const resolvedLink = this.routeUtil.resolveDynamicLink(item.link, params);
          breadcrumbs.push({
            ...item,
            link: resolvedLink
          });
        });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }


}
