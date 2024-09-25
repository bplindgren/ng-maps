import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeographicLocation } from '../models/geographicLocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() userMarkerLoc: GeographicLocation;
  @Output() onMapClickEvent = new EventEmitter();

  async initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 3,
        center: this.userMarkerLoc ? { lng: this.userMarkerLoc.y, lat: this.userMarkerLoc.x } : { lng: -100.000, lat: 43.000 },
        mapId: "759f53abbd4a188f",
      }
    );

    let marker = new AdvancedMarkerElement({
      map,
      position: this.userMarkerLoc ? { lng: this.userMarkerLoc.y, lat: this.userMarkerLoc.x } : null
    });

    map.addListener("click", (mapsMouseEvent) => {
      marker.position = mapsMouseEvent.latLng;
      this.onMapClick(mapsMouseEvent);
    });
  }

  ngAfterViewInit(): void {
    console.log(this.userMarkerLoc);
    this.initMap();
  }

  onMapClick(mapsMouseEvent: any): void {
    this.onMapClickEvent.emit(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
  }

}
