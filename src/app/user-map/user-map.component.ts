import { Component, AfterViewInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { Coordinate } from '../../models/interfaces/coordinate';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements AfterViewInit, OnChanges {
  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number;
  map: google.maps.Map;
  marker: google.maps.Marker;
  @Input() isEditing: boolean;
  @Output() evtEmitterLocation: EventEmitter<any> = new EventEmitter();

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  ngAfterViewInit(): void {
    let coordinates = {lat: this.lat, lng: this.lng};

    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: this.zoom,
      streetViewControl: false,
      disableDoubleClickZoom: true
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });

    this.map.addListener("click", ($event) => {
      if(this.isEditing) {
        this.marker.setPosition($event.latLng);
        this.evtEmitterLocation.emit($event.latLng)
      } else {
        alert("Click edit to change your location!")
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.marker.setPosition({lat: this.lat, lng: this.lng})
  }

}
