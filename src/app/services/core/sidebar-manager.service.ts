import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router} from '@angular/router';
import {SidebarConfig} from 'ROOT/app.routes';

@Injectable({
  providedIn: 'root'
})
export class SidebarManager {

  protected sidebarVisible = true;

  public hideSidebar() {
    this.sidebarVisible = false;
  }

  public showSidebar() {
    this.sidebarVisible = true;
  }

  public isSidebarVisible() {
    return this.sidebarVisible;
  }

  public toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}

@Injectable({
  providedIn: 'root'
})
export class SidebarResolver implements Resolve<boolean> {

  constructor(private router: Router, private sidebarManager: SidebarManager) {}

  resolve(route: ActivatedRouteSnapshot): boolean {
    const sidebarConfig: SidebarConfig = route.data['sidebarConfig'];
    const fullPath = this.getFullPrimaryPath(route);

    // Automatically navigate to load the appropriate sidebars
    setTimeout(() => {
      this.loadSidebars(fullPath, sidebarConfig);
    });

    return true;
  }

  private getFullPrimaryPath(snapshot: ActivatedRouteSnapshot): string {
    const segments: string[] = [];

    let current: ActivatedRouteSnapshot | null = snapshot;

    // traverse the route tree upwards to build the full path
    while (current != null) {
      if (current.routeConfig && current.routeConfig.path) {
        let path = current.routeConfig.path;

        // replace dynamic parameters in the path
        Object.keys(current.params).forEach(param => {
          if(current != null)
            path = path.replace(`:${param}`, current.params[param]);
        });

        segments.unshift(path);
      }

      current = current.parent;
    }

    return segments.filter(Boolean).join('/');
  }

  private loadSidebars(path: string, config: SidebarConfig): void {
    const outlets: any = { primary: path };

    outlets.sidebar = config.sidebarType;

    // load mini sidebar if required...
    if (config.hasMiniSidebar) {
      outlets['mini-sidebar'] = 'mini';
    } else {
      outlets['mini-sidebar'] = null;
    }

    // navigate to the outlets...
    this.router.navigate([{ outlets }]);
  }
}

