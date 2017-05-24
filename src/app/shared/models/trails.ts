import { Area, Entity } from './area'
import * as L from 'leaflet';


export class Trails {
   private lines: Array<L.Polyline> = [];
   
   constructor() {

   }

   private styleFromStatus(status) : L.PolylineOptions {
      let color: L.PolylineOptions;
      switch (status) {
         case 'Stopped':
            color = { color: 'red', opacity: 1.0, weight: 2}
            break;
         case 'TerrainTravel':
            color = { color: 'yellow', opacity: 1.0, weight: 2}
            break;
         case 'Processing':
            color = { color: 'blue', opacity: 1.0, weight: 2}
            break;
         default:
            color = { color: 'grey', opacity: 1.0, weight: 2}
            break;
      }
      return color;
   }

   create(enteties: Entity[]) {
      for (let entity of enteties) {
         let locations = entity.locationHistory;

         // create first line segment
         let status = locations[0].status;
         let polyline = [];

         for (let i = 0; i < locations.length; i++) {
            
            // status change ?
            if(status != locations[i].status) {
               // store poly and start new
               polyline.push(new L.LatLng(locations[i].lat, locations[i].lng));
               this.lines.push(new L.Polyline(polyline, this.styleFromStatus(status)));
               polyline = [];
               status = locations[i].status
            }

            polyline.push(new L.LatLng(locations[i].lat, locations[i].lng));
         }
         // add last line
         this.lines.push(new L.Polyline(polyline, this.styleFromStatus(status)));
      }
   }

   setMap(map: L.Map) {
      if(map) {
         //set
         for (let line of this.lines) {
            line.addTo(map);
         }
      } 
   }

   clear(map: L.Map) {
      if(map) {
         for (let line of this.lines) {
            line.removeFrom(map);
            line = null;
         }
         this.lines = [];
      } 
   }

   private step = 0;
   updateMock() {
      /*let path = this.lines[this.lines.length - 1].getPath();
      let latlng =  path.getAt(path.getLength() - 1);
      let nextLocation = new google.maps.LatLng(latlng.lat() + (Math.random() - 0.5) * 0.001, latlng.lng() + (Math.random() - 0.5) * 0.001);
      path.push(nextLocation);

      if((this.step++ > 3)) {
         this.step = 0;
         this.lines[this.lines.length - 1].getMap().panTo(nextLocation);
      }*/
      
   }
}