import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Area, Entity } from '../shared/models/area'
import * as L from 'leaflet';
import 'proj4leaflet';


@Component({
   selector: 'app-map-container',
   templateUrl: './map-container.component.html',
   styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, OnChanges {
   @Input() area: Area

   options: L.MapOptions;
   map: L.Map;
   threeLayer: any; // 3d layer
   //tracks;

   constructor(public element: ElementRef) { }

   ngOnInit() {
      
      

      let crs = new L['Proj'].CRS('EPSG:3006',
         '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
         {
            resolutions: [
               4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8
            ],
         
            origin: [-1200000.000000, 8500000.000000],
            bounds: L.bounds([-1200000.000000, 8500000.000000], [4305696.000000, 2994304.000000])
         });

      this.options = {
         center: { lat: 59.3167, lng: 18.0667 },
         zoom: 9,
         crs: crs
      };
      let token = 'eac1ecb16ea2dbd68cba21e7218f7b';

      this.map = new L.Map(this.element.nativeElement.children[0], this.options);

       /*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18
       }).addTo(this.map);*/

      new L.TileLayer('https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/' + token + '/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=topowebb&STYLE=default&TILEMATRIXSET=3006&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fpng', {
         maxZoom: 9,
         minZoom: 0,
         continuousWorld: true,
         attribution: '&copy; <a href="https://www.lantmateriet.se/en/">Lantmäteriet</a> Topografisk Webbkarta Visning, CCB',
      }).addTo(this.map);
    
      //google.maps.event.addListenerOnce(this.map, "projection_changed", () => {
      //   this.setupThreeLayer(this.map);
      //   console.log('map projection availible');
      //});
   }

   ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
         let current: Area = changes[propName].currentValue;
         if (propName === 'area' && current) {
            // new area selected
            if (current.entities.length > 0) {

               //this.trails.newTrails(current.entities, this.map.getProjection());
               //this.production.newProduction(current.production, this.map.getProjection());

               this.map.panTo(current.entities[0].locationHistory[0]);
               this.map.setZoom(16);

               //test rt component
               //this.tracks = current.entities;
            }
         }
      }
   }

   updateArea(area: Area) {

   }

   /*private setupThreeLayer(map: any) {

      this.threeLayer = new ThreejsLayer({ map: this.map }, function (layer) {
         console.log('threeJs layer ready');
      });

      let projection = map.getProjection();

      //let test = new GlTest(projection);
      //test.set(this.threejsLayer);

      this.trails = new GlPath();
      this.trails.setVerticesTest(projection);
      this.trails.set(this.threeLayer);

      //this.production = new GlProductionSprite();
      //this.production.setVerticesTest(projection);
      //this.production.set(this.threeLayer);

   }*/
   }
