import {Routes} from '@angular/router';
import {
  DefaultSidebarContentComponent
} from 'ROOT/components/default-sidebar-content/default-sidebar-content.component';
import {IconSidebarContentComponent} from 'ROOT/components/icon-sidebar-content/icon-sidebar-content.component';
import {SidebarResolver} from 'ROOT/services/core/sidebar-manager.service';
import {canActivateAuthRole} from 'ROOT/services/core/authguard.service';
import {DashboardComponent} from 'ROOT/pages/dashboard/dashboard.component';
import {PersonalAreaComponent} from 'ROOT/pages/personal-area/personal-area.component';
import {BreadcrumbConfig} from 'ROOT/model/BreadcrumbConfig';
import {Entity1ListComponent} from 'ROOT/pages/entity1/entity1-list/entity1-list.component';
import {Entity1CreateComponent} from 'ROOT/pages/entity1/entity1-create/entity1-create.component';
import {Entity1DetailComponent} from 'ROOT/pages/entity1/entity1-detail/entity1-detail.component';
import {CustomSidebar} from 'ROOT/components/custom-sidebar/custom-sidebar';
import {Entity3ListComponent} from 'ROOT/pages/entity3/entity3-list/entity3-list.component';
import {Entity3CreateComponent} from 'ROOT/pages/entity3/entity3-create/entity3-create.component';
import {Entity2CreateComponent} from 'ROOT/pages/entity2/entity2-create/entity2-create.component';
import {Entity2DetailComponent} from 'ROOT/pages/entity2/entity2-detail/entity2-detail.component';
import {Entity2ListComponent} from 'ROOT/pages/entity2/entity2-list/entity2-list.component';
import {Entity3DetailComponent} from 'ROOT/pages/entity3/entity3-detail/entity3-detail.component';

// Helper function to create a simple route definition
export function createSimpleRoute(
  path: string,
  component: any,
  breadcrumbConfig: BreadcrumbConfig[],
  children: any = [],
  sidebarConfig: SidebarConfig = defaultSidebarConfig,
) {
  const routeDef = {
    path,
    component,
    resolve: { sidebar: SidebarResolver },
    canActivate: [canActivateAuthRole],
    data: {
      sidebarConfig: sidebarConfig,
      breadcrumbConfig: breadcrumbConfig
    },
    children: children
  };

  return routeDef;
}

export interface SidebarConfig {
  sidebarType: 'default' | 'custom',
  hasMiniSidebar: boolean
}

const defaultSidebarConfig : SidebarConfig = { sidebarType: "default", hasMiniSidebar: false };


export const routes: Routes = [

  { path: '', redirectTo: 'ui/dashboard', pathMatch: 'full' },

  createSimpleRoute('ui/dashboard', DashboardComponent, [{icon: 'ChartSpline', title: 'Dashboard', link: 'ui/dashboard'}]),

  // tricky routes for the sidebar but they work well for breadcrumb construction
  createSimpleRoute('ui/entity1', null, [{icon: 'Folders', title: 'Entity 1', link: 'ui/entity1'}], [
    createSimpleRoute('', Entity1ListComponent, []),
    createSimpleRoute('create', Entity1CreateComponent, [{icon: 'FilePlus', title: 'Entity 1 create', link: 'create'}]),
    createSimpleRoute('edit/:idEntity1', Entity1DetailComponent, [{icon: 'FilePenLine', title: 'Entity 1 edit', link: 'edit/:idEntity1'}],
      null,{sidebarType: "custom", hasMiniSidebar: true}),
  ]),

  createSimpleRoute('ui/entity2', null, [{icon: 'Package', title: 'Entity 2', link: 'ui/entity2'}], [
    createSimpleRoute('', Entity2ListComponent, []),
    createSimpleRoute('create', Entity2CreateComponent, [{icon: 'PackagePlus', title: 'Entity 2 create', link: 'create'}]),
    createSimpleRoute('edit/:idEntity2', Entity2DetailComponent, [{icon: 'SquarePen', title: 'Entity 2 edit', link: 'edit/:idEntity2'}]),
  ]),
  createSimpleRoute('ui/entity3', null, [{icon: 'Blocks', title: 'Entity 3', link: 'ui/entity3'}], [
    createSimpleRoute('', Entity3ListComponent, [], [], {sidebarType: "default", hasMiniSidebar: true}),
    createSimpleRoute('create', Entity3CreateComponent, [{icon: 'Grid2X2Plus', title: 'Entity 3 create', link: 'create'}]),
    createSimpleRoute('edit/:idEntity3', Entity3DetailComponent, [{icon: 'SquarePenIcon', title: 'Entity 3 edit', link: 'edit/:idEntity3'}]),
  ]),

  // Auxiliary sidebar routes
  { path: 'default', component: DefaultSidebarContentComponent, outlet: 'sidebar' },
  { path: 'custom', component: CustomSidebar, outlet: 'sidebar' },
  { path: 'mini', component: IconSidebarContentComponent, outlet: 'mini-sidebar' }
];
