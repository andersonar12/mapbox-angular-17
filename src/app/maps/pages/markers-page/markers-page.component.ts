import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  type OnInit,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  public map?: Map;
  public markers: MarkerColor[] = [];

  public currenLngLat: LngLat = new LngLat(
    -66.92232159967972,
    10.50467823051342
  );

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // if (!this.mapElement) throw new Error('Map element not found');
    this.map = new Map({
      container: /*  this.mapElement?.nativeElement */ 'map',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currenLngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Hello World';

    // const marker = new Marker({
    //   element: markerHtml,
    // })
    //   .setLngLat(this.currenLngLat)
    //   .addTo(this.map);

    // Ensure change detection is run after the map is initialized
    this.cdr.detectChanges();
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;
    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
