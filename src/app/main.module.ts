import {ApplicationRef, DoBootstrap, importProvidersFrom, inject, NgModule, provideAppInitializer} from '@angular/core';
import {APP_BASE_HREF, CommonModule, PlatformLocation} from '@angular/common';
import {provideRouter, RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {routes} from "ROOT/app.routes";
import {App} from "ROOT/app";
import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {DefaultSidebarContentComponent} from './components/default-sidebar-content/default-sidebar-content.component';
import {IconSidebarContentComponent} from './components/icon-sidebar-content/icon-sidebar-content.component';
import {HeaderComponent} from './components/header/header.component';
import {PreloaderService} from 'ROOT/services/core/preloader.service';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {
  Blocks,
  ChartSpline,
  FilePenLine,
  FilePlus,
  Folders,
  Grid2X2Plus,
  House,
  LogOut,
  LucideAngularModule,
  Package,
  PackagePlus,
  SquarePen,
  SquarePenIcon,
  User
} from 'lucide-angular';
import {BreadcrumbComponent} from './components/core/breadcrumb/breadcrumb.component';
import {Entity1ListComponent} from 'ROOT/pages/entity1/entity1-list/entity1-list.component';
import {Entity1DetailComponent} from 'ROOT/pages/entity1/entity1-detail/entity1-detail.component';
import {Entity1CreateComponent} from 'ROOT/pages/entity1/entity1-create/entity1-create.component';
import {Entity2CreateComponent} from 'ROOT/pages/entity2/entity2-create/entity2-create.component';
import {Entity2DetailComponent} from 'ROOT/pages/entity2/entity2-detail/entity2-detail.component';
import {Entity2ListComponent} from 'ROOT/pages/entity2/entity2-list/entity2-list.component';
import {Entity3ListComponent} from 'ROOT/pages/entity3/entity3-list/entity3-list.component';
import {CustomSidebar} from 'ROOT/components/custom-sidebar/custom-sidebar';
import {Entity3DetailComponent} from 'ROOT/pages/entity3/entity3-detail/entity3-detail.component';

@NgModule({
  declarations: [
    App,
    SidebarComponent,
    DefaultSidebarContentComponent,
    IconSidebarContentComponent,
    CustomSidebar,
    HeaderComponent,
    DashboardComponent,
    BreadcrumbComponent,
    Entity1ListComponent,
    Entity1DetailComponent,
    Entity1CreateComponent,
    Entity2ListComponent,
    Entity2CreateComponent,
    Entity2DetailComponent,
    Entity3ListComponent,
    Entity3DetailComponent,
    Entity3ListComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    RouterModule,
    LucideAngularModule.pick({User, ChartSpline, Folders, FilePlus, FilePenLine, Package,
      PackagePlus, SquarePen, Blocks, Grid2X2Plus, SquarePenIcon, LogOut, House})],

  providers: [

    provideAppInitializer(() => {
      const preloaderService = inject(PreloaderService);
      return preloaderService.loadConfig();
    }),

    importProvidersFrom(BrowserModule),

    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),

    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },

    provideHttpClient()
  ]
})
export class MainModule implements DoBootstrap {
  ngDoBootstrap(app: ApplicationRef) {

    let baseHref = "";//platformLocation.getBaseHrefFromDOM();
    if (baseHref.endsWith("/"))
      baseHref = baseHref.substr(0, baseHref.length - 1);

    app.bootstrap(App);
  }
}
