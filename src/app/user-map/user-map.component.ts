import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() lat: number;
  @Input() lng: number;
  @Input() source: string;
  zoom: number;
  map: google.maps.Map;
  @Input() isEditing: boolean;
  marker: google.maps.Marker;
  @Output() evtEmitterLocation: EventEmitter<any> = new EventEmitter();

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  ngOnInit(): void {
    if(this.source == "register") {
      this.zoom = 3;
      this.isEditing = true;
    } else if (this.source == "user") {
      this.zoom = 6;
      this.isEditing = false;
    };
  }

  ngAfterViewInit(): void {
    let coordinates = {lat: this.lat, lng: this.lng};

    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: this.zoom,
      streetViewControl: false
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    if(this.source == "user") {
      this.addMarker(coordinates);
    };

    this.map.addListener("click", ($event) => {
      if(!this.marker) {
        this.addMarker(coordinates);
      };

      if(this.isEditing) {
        this.marker.setPosition($event.latLng);
        this.evtEmitterLocation.emit($event.latLng)
      } else {
        alert("Click edit to change your location!")
      };
    });
  }

  addMarker(coordinates: any) {
    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map) {
      this.marker.setPosition({lat: this.lat, lng: this.lng});
    }
  }

}
