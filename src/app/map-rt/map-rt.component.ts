import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Area, Entity } from '../shared/models/area'
import * as L from 'leaflet';
import { Trails } from '../shared/models/trails'
//import { } from '@types/googlemaps';

@Component({
   selector: 'app-map-rt',
   templateUrl: './map-rt.component.html',
   styleUrls: ['./map-rt.component.scss']
})
export class MapRtComponent implements OnInit, OnChanges {
   @Input() map: L.Map;
   @Input() area: Area;

   tracking: boolean = false;
   private intervalTimer;
   private googleTrails = new Trails();

   constructor() { }

   ngOnInit() {


   }

   ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
         let current : Area = changes[propName].currentValue;
         if(propName === 'area' && current) {
            // new area selected
            if(current.entities.length > 0) {
               this.initMap();
              
            }
         }
      }
   }

   onTrackToggle(e) {
      if (e.checked) {
         console.log('checked');
         this.tracking = true;
         this.initMap();
         this.intervalTimer = setInterval(() => this.updateTrackMock(), 300);
      } else {
         console.log('unchecked');
         //this.tracking = false;
         clearInterval(this.intervalTimer);

         this.clearMap();
      }
   }

   updateTrackMock() {
      console.log('stepping');
      //this.googleTrails.updateMock();
   }

   initMap() {
      this.googleTrails.clear(this.map);
      this.googleTrails.create(this.area.entities);
      this.googleTrails.setMap(this.map);
   }

   clearMap() {
      this.googleTrails.clear(this.map);
   }
}
