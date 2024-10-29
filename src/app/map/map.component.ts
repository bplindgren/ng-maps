import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { User } from '../models/user';
import { GeographicLocation } from '../models/geographicLocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() user: User;
  @Output() onMapClickEvent = new EventEmitter();

  async initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: this.user ? 4 : 2,
        center: this.user ? this.getCenter() : { lng: -100.000, lat: 43.000 },
        mapId: "759f53abbd4a188f",
      }
    );

    let marker = new AdvancedMarkerElement({
      map,
      position: this.user ? this.getCenter() : null
    });

    map.addListener("click", (mapsMouseEvent) => {
      marker.position = mapsMouseEvent.latLng;
      this.onMapClick(mapsMouseEvent);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  getCenter(): any {
    if(this.user) {
      let loc = this.user.location;
      return { "lng": loc.x, "lat": loc.y };
    } else {
      return { lng: -100.000, lat: 43.000 };
    }
  }

  onMapClick(mapsMouseEvent: any): void {
    this.onMapClickEvent.emit(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
  }

}
