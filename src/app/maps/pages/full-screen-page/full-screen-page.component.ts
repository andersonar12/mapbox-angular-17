import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, type OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-full-screen-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    // if (!this.mapElement) throw new Error('Map element not found');
    const map = new Map({
      container: /*  this.mapElement?.nativeElement */ 'map',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
