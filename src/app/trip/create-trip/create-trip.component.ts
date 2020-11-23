import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../../shared-services/server.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  hasSubmittedAttempt: boolean = false;
  map: any;
  locations: number[][] = [];
  displayError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      summary: ['', Validators.required]
    })
  }

  get title() { return this.form.get('title'); }
  get startDate() { return this.form.get('startDate'); }
  get endDate() { return this.form.get('endDate'); }
  get summary() { return this.form.get('summary'); }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([42, -93.5], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      L.marker(e.latlng).addTo(this.map);
      this.locations.push([e.latlng.lng, e.latlng.lat]);
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.hasSubmittedAttempt = true;
      return;
    }

    if (this.locations.length < 1) {
      this.hasSubmittedAttempt = true;
      this.displayError = true;
      return;
    }

    let data = {
      username: localStorage.username,
      title: this.form.get('title').value,
      startDate: this.form.get('startDate').value,
      endDate: this.form.get('endDate').value,
      summary: this.form.get('summary').value,
      geometry: {
        type: "LineString",
        coordinates: this.locations
      }
    };

    const request = this.server.request('POST', '/trips', data).subscribe((res) => {
      this.router.navigate(['/trips']);
    })

  }

}
