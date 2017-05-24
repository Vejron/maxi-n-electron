import { Component, OnInit, Input } from '@angular/core';
import { loadshp } from '../../shared/lib/shpLoader.js'

@Component({
   selector: 'app-shape-layer',
   templateUrl: './shape-layer.component.html',
   styleUrls: ['./shape-layer.component.scss']
})
export class ShapeLayerComponent implements OnInit {
   @Input() map: L.Map;
   myLayer;

   constructor() { }

   ngOnInit() {
      console.log(loadshp);
      this.myLayer = L.geoJSON().addTo(this.map);
   }

   handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

      if (file.size > 0) {
         console.log(file.size);
         this._loadShp(file);
      }


      //var pattern = /image-*/;
      /*var reader = new FileReader();

      if (!file.type.match(pattern)) {
          alert('invalid format');
          return;
      }

      //this.loaded = false;

      //reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);*/
      console.log('file!');
   }

   _loadShp(file) {
      loadshp({
         url: file,
         encoding: 'UTF-8',
         EPSG: 4326
      }, (data) => {
         console.log(data);
         this.myLayer.addData(data);
         this.map.fitBounds([
            [data.bbox[1], data.bbox[0]], [data.bbox[3], data.bbox[2]]
         ]);
      })
   }

}
