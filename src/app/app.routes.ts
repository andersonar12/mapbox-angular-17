import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'maps',
    loadComponent: () =>
      import('./maps/layout/maps-layout/maps-layout.component').then(
        (m) => m.MapsLayoutComponent
      ),
    children: [
      {
        path: 'fullscreen',
        loadComponent: () =>
          import(
            './maps/pages/full-screen-page/full-screen-page.component'
          ).then((m) => m.FullScreenPageComponent),
      },
      {
        path: 'markers',
        loadComponent: () =>
          import('./maps/pages/markers-page/markers-page.component').then(
            (m) => m.MarkersPageComponent
          ),
      },
      {
        path: 'properties',
        loadComponent: () =>
          import('./maps/pages/properties-page/properties-page.component').then(
            (m) => m.PropertiesPageComponent
          ),
      },
      {
        path: 'zoom-range',
        loadComponent: () =>
          import('./maps/pages/zoom-range-page/zoom-range-page.component').then(
            (m) => m.ZoomRangePageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/maps/fullscreen',
  },
];
