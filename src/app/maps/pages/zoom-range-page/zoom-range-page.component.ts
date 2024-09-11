import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  public map?: Map;
  public zoom = 10;
  public currenLngLat: LngLat = new LngLat(-74.5, 40);

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // if (!this.mapElement) throw new Error('Map element not found');
    this.map = new Map({
      container: /*  this.mapElement?.nativeElement */ 'map',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currenLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    // Ensure change detection is run after the map is initialized
    this.cdr.detectChanges();

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    this.map?.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    });

    this.map?.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return;

      this.map?.zoomTo(18);
    });

    this.map?.on('move', () => {
      this.currenLngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    if (this.map) {
      this.map.zoomTo(this.zoom);
    }
  }
}
