import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private accessToken =
    'pk.eyJ1IjoiYW5kZXJzb25hcjEyIiwiYSI6ImNrcWp1dnFqajBhNngzMW12cXY4MjhhM2QifQ.d1WrSOlwb_SjhiTyQScFxQ';

  constructor() {
    (mapboxgl as any).default.accessToken = this.accessToken;
  }
}
