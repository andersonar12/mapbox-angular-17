import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, type OnInit } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];
  @Input() idElement: string = 'map';

  public map?: Map;

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.idElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat!, // starting position [lng, lat]
      zoom: 15, // starting zoom,
      interactive: false,
    });

    new Marker().setLngLat(this.lngLat!).addTo(this.map);
  }
}
