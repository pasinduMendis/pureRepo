import React, { Component } from 'react';
import GoogleMapReact, { fitBounds } from 'google-map-react';
import Marker from '../Marker';
import mapStyles from './mapStyles.json';
import emitter from '../../../utils/EventEmitter';
import Button from 'react-bootstrap/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { unhover } from '@testing-library/user-event/dist/hover';


const MAP = {
   defaultZoom: 1,
   defaultCenter: { lat: 35.2565914, lng: -84.5513343 },
   options: {
      styles: mapStyles,
      maxZoom: 20,
      clickableIcons: false
   },
   currentZoomLevel: 1,

};

const mapDto = {
   isCityConsider: true,
   fitBounds: null
};

export class GoogleMap extends Component {

   state = {
      bounds: null,
      expansionDistance: 0,
      expandedBounds: null,
      currentBoundForExpand: null,
      isExpanded: false,
      currentZoomLevel: 0,
      kilometers: 0,
      canShowLocationsWhenZoomOut: false,
      map: null,
      maps: null,
      isBoundryRemoved: false,
      polygonList:[],
      center: null,
      currentBound: null

   };

   handleMapLoad = (map, maps) => {
      this.map = map;
      this.maps = maps;
      this.setMapZoomAndCenter();
      this.setState({ map: this.map, maps: this.maps });
   };

   setMapZoomAndCenter = () => {

      let isExpanded = JSON.parse(localStorage.getItem("isExpanded")); // uses to handle componendDiUpdate() in index.js

      if (isExpanded) {
         this.setZoom();
      } else {
         if (!this.state.canShowLocationsWhenZoomOut) {
            if (this.map != undefined && this.maps != undefined) {
               let bounds = new this.maps.LatLngBounds();
               this.props.locations.forEach((location) => {
                  bounds.extend(new this.maps.LatLng(location.lat, location.lng));
               });
               if (bounds.isEmpty()) {
                  this.map.setZoom(MAP.defaultZoom);
                  this.map.setCenter(MAP.defaultCenter);
               } else {
                  this.map.fitBounds(bounds);
               }
            }
         }

      }
   };

   componentDidMount() {


      // this.interval = setInterval(() => { // use this if the map is object isnot inizialized in smpart phone
      //    this.customMapLoadhandler();         
      //  }, 1000);

      this.setMapZoomAndCenter();
      this.eventHandler();
   }

   componentDidUpdate(prevProps) {
      this.handleUpdates();
   }

   eventHandler = () => {
      emitter.on('distanceChangeEvent', (data) => {
         if (localStorage.getItem("isExpandedEventEmited") == "true") {
            if (this.map != undefined) {
               localStorage.setItem("isExpandedEventEmited", false);
               this.expandBounds(data.payload);
            }
         }
      });

      emitter.on('seachChangeEvent', (data) => {
         if(localStorage.getItem("isOnSeachChangeEventEmited") == "true"){
            localStorage.setItem("isOnSeachChangeEventEmited", false);
            mapDto.isCityConsider = true;            
            mapDto.fitBounds = null;
            mapDto.isTextChanged = true;
            mapDto.sendDataDto = JSON.stringify(data.payload);
            this.props.onMapUpdated(undefined, undefined, mapDto);
            if(data.payload.addressKey != ""){
               // this.fetchCityBoundaries(data.payload.addressKey);
            }       
         }
       });

       emitter.on('fetchCityBoundariesEvent', (data) => {
         if (localStorage.getItem("isFetchCityBoundariesEventEmited") == "true") {
            if (this.map != undefined) {
               localStorage.setItem("isFetchCityBoundariesEventEmited", false);
               // this.fetchCityBoundaries(data.payload);
            }
         }
      });
   }

   handleUpdates = () => {

      if (localStorage.getItem("isCityConsider") == "true") {

         if (this.state.map == null) {
            // localStorage.setItem("enableCustomMapLoadhandler", true); //// use this if the map is object isnot inizialized in smpart phone
         } else {
            localStorage.setItem("isCityConsider", false); // uses to handle componendDiUpdate() in index.js
         }
         this.setMapZoomAndCenter();
         this.saveCurrentCityBound();
      }

      let enableRemoveBoundry = localStorage.getItem('enableRemoveBoundry');
      if (enableRemoveBoundry != undefined && enableRemoveBoundry == 'true') {
         if (this.state.map != null) {

            localStorage.setItem("enableRemoveBoundry", false);
            this.setState({
               isBoundryRemoved: false,
               canShowLocationsWhenZoomOut: false
            })
         }
      }

   }

   handleZoomChanged = (zoomLevel, boundCoords, newCenter) => {
      // if (this.state.canShowLocationsWhenZoomOut || this.state.currentZoomLevel > zoomLevel) {

      //  uses when remove boundry button is clicked 
      if (this.state.canShowLocationsWhenZoomOut) { 
         mapDto.isCityConsider = false;
         mapDto.sendDataDto = null;
         mapDto.fitBounds = null;
         mapDto.isTextChanged = false;
         this.props.onMapUpdated(true, boundCoords, mapDto)
         localStorage.setItem("currentBoundWhenWithRemoveBoundryEnabled", JSON.stringify(boundCoords))
      }
      //       uses when map draged           or  click on zoom in zoom out button
      // else if( this.props.currentCity != 'no current, location' && (this.isCenterChanged(newCenter) || this.isBoundChanged(boundCoords, this.state.currentBound)) ){
      //    mapDto.isCityConsider = false;
      //    mapDto.sendDataDto = null;
      //    mapDto.fitBounds = null;
      //    mapDto.isTextChanged = false;
      //    this.props.onMapUpdated(true, boundCoords, mapDto)

      // }

      this.setState({
         currentZoomLevel: zoomLevel,
         center:newCenter,
         currentBound: boundCoords
      });
   };

   handleMapChanges = (mapData) => {
      const { ne, nw, se, sw } = mapData.marginBounds;

      const coords = {
         lat: {
            start: ne.lat,
            end: se.lat,
         },
         lng: {
            start: nw.lng,
            end: ne.lng,
         },
      };

      this.handleZoomChanged(mapData.zoom, coords, mapData.center);
   };

   expandBounds = (sendDataDto) => {
      if (this.map.getZoom() > 8) {

         this.setState(prevState => {
            if (prevState.kilometers > sendDataDto.selectedDistnaceInput) {
               this.setState({ canShowLocationsWhenZoomOut: true });
            }
            return { kilometers: sendDataDto.selectedDistnaceInput };
         })
         const bounds = this.state.currentBoundForExpand;

         const expansionDistance = (sendDataDto.selectedDistnaceInput / 11) * 0.1; // 0.1 degree is roughly 11 kilometers

         // Expand the bounding box
         const expandedBounds = {
            ne: {
               lat: bounds.ne.lat() + expansionDistance,
               lng: bounds.ne.lng() + expansionDistance
            },
            sw: {
               lat: bounds.sw.lat() - expansionDistance,
               lng: bounds.sw.lng() - expansionDistance
            }
         };

         const { ne, sw } = expandedBounds;
         const coords1 = {
            lat: {
               start: ne.lat,
               end: sw.lat,
            },
            lng: {
               start: sw.lng,
               end: ne.lng,
            },
         }

         this.setState({ expandedBounds: expandedBounds });

         mapDto.isCityConsider = false;
         mapDto.fitBounds = this.setZoom;

         sendDataDto.latTo = coords1.lat.start
         sendDataDto.latFrom = coords1.lat.end
         sendDataDto.lngTo = coords1.lng.end
         sendDataDto.lngFrom = coords1.lng.start
         mapDto.sendDataDto = JSON.stringify(sendDataDto);
         this.props.onMapUpdated(true, coords1, mapDto);

      };

   };

   setZoom = () => {
      let isExpanded = JSON.parse(localStorage.getItem("isExpanded"));   // uses to handle componendDiUpdate() in index.js     
      if (isExpanded && this.state.expandedBounds != null) {

         const { ne, sw } = this.state.expandedBounds

         const bounds1 = {
            ne: {
               lat: ne.lat,
               lng: ne.lng
            },
            sw: {
               lat: sw.lat,
               lng: sw.lng
            }
         };


         let bounds = new this.maps.LatLngBounds(
            new this.maps.LatLng(sw.lat, sw.lng),
            new this.maps.LatLng(ne.lat, ne.lng)
         );

         this.map.setZoom(this.calculateZoom(bounds1));
         this.renderMarker();

         // this.timeoutId = setTimeout(() => {
         //    this.setState({
         //       isExpanded:false
         //    })
         //  }, 5000);


      }
   }

   calculateZoom(bounds) {

      let isItMobile = localStorage.getItem("isItMobile");
      let element = null;
      if (isItMobile != undefined && isItMobile == "true") {
         element = document.getElementById('gMmapMobile');
      } else {
         element = document.getElementById('gMap');
      }

      const viewSize = {
         x: element.offsetWidth,
         y: element.offsetHeight,
      }

      var WORLD_DIM = { height: 256, width: 256 };
      var ZOOM_MAX = 21;

      function latRad(lat) {
         var sin = Math.sin(lat * Math.PI / 180);
         var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
         return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
      }

      function zoom(mapPx, worldPx, fraction) {
         return (Math.log(mapPx / worldPx / fraction) / Math.LN2);
      }

      var ne = bounds.ne;
      var sw = bounds.sw;

      var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

      var lngDiff = ne.lng - sw.lng;
      var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

      var latZoom = zoom(viewSize.y, WORLD_DIM.height, latFraction);
      var lngZoom = zoom(viewSize.x, WORLD_DIM.width, lngFraction);

      return Number(Math.min(latZoom, lngZoom, ZOOM_MAX).toFixed(1));

   }

   renderMarker() {
      return this.props.locations.map((location, index) => (
         <Marker
            key={index}
            lat={location.lat}
            lng={location.lng}
            data={location.dataID}
         />
      ))
   }

   componentWillUnmount() {
      // Remove event listener when GoogleMap is unmounted
      emitter.off('distanceChangeEvent');
   }

   saveCurrentCityBound = () => {
      if (this.map != undefined) {
         const bounds = this.map.getBounds();

         // Extract latitude and longitude values from the bounds object
         const ne = bounds.getNorthEast();
         const sw = bounds.getSouthWest();

         // Prepare the coords object using the extracted values
         const coords = {
            ne: bounds.getNorthEast(),
            sw: bounds.getSouthWest()
         }

         this.setState({
            currentBoundForExpand: coords
         })
      }

   }

   customMapLoadhandler = () => {
      let handler = localStorage.getItem("enableCustomMapLoadhandler");
      if (handler != undefined && handler == "true" && this.state.map != null) {
         localStorage.setItem("enableCustomMapLoadhandler", false);
         this.setMapZoomAndCenter();
      }

   }

   removeBoundry = () => {
      this.setState({
         isBoundryRemoved: true,
         canShowLocationsWhenZoomOut: true
      }, ()=>{
         if(this.map != undefined){

            const bounds = this.map.getBounds();
            const coords = {
               lat: {
                  start: bounds.getNorthEast().lat(),
                  end: bounds.getSouthWest().lat(),
               },
               lng: {
                  start: bounds.getSouthWest().lng(),
                  end: bounds.getNorthEast().lng(),
               },
            }            

            this.handleZoomChanged(this.map.getZoom(), coords);
            this.clearPolygons();
         }
         
      })



      localStorage.setItem('isBoundryRemoved', true);

   }

   fetchCityBoundaries = (currentCity) => {
      let inputString = currentCity;
      let splitWords = inputString.split(", ");
      let cleanedWords = splitWords.map(word => word.trim());
      let city = cleanedWords.join("+");

      axios
         .get('https://nominatim.openstreetmap.org/search?q=+'+city+'&format=xml&polygon_kml=1&addressdetails=1')
         .then((response) => {
            this.renderPolygon(response.data)
         });      
   };

   renderPolygon = (xmlStrings) => {
      if(this.state.polygonList.length > 0){
         this.clearPolygons();
      }
      
      let  coordinatesArray = this.parseCoordinatesFromXml(xmlStrings);

      const cityPolygon = new this.maps.Polygon({
         paths: coordinatesArray,
         strokeColor: '#00A4E6', // Blue color for the polygon border
         strokeOpacity: 0.8,
         strokeWeight: 4,
         // fillColor: '#0000FF',
         fillOpacity: 0,
         // strokeDashArray: [100, 100]
       });

       this.state.polygonList.push(cityPolygon)
       cityPolygon.setMap(this.map);
   };

   clearPolygons = () => {
     
      const mapPolygons = this.state.polygonList;

      if (mapPolygons) {
         mapPolygons.forEach(polygon => {
              polygon.setMap(null);
          });
      }

      
   };

   parseCoordinatesFromXml = (xmlString) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const coordinatesNodes = xmlDoc.querySelectorAll('coordinates');

      let maxLength = 0;
      let resultArray = [];

      coordinatesNodes.forEach((coordinatesNode) => {
         const coordinatesString = coordinatesNode.textContent.trim();
         if (coordinatesString) {
            const coordinatesPairs = coordinatesString.split(' ');
            const coordinates = coordinatesPairs.map((pair) => {
               const [lng, lat] = pair.split(',').map(Number);
               return { lat, lng };
            });

            if (coordinates.length > maxLength) {
               maxLength = coordinates.length;
               resultArray = coordinates;
            }
         }
      });

      return resultArray;
   };

   isCenterChanged = (newCenter) => {
      if(this.state.center != null && this.state.center.lat !=  newCenter.lat && this.state.center.lng != newCenter.lng){
         return true;
      }
      return false;
   }
   
   isBoundChanged = (obj1, obj2) => {
      if(obj1 != null && obj2 != null){
         for (let key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                // Check if the property exists in both objects and has the same value
                if (!(key in obj2) || JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                    return true; // Objects are different
                }
            }
         }
      }  
 
     return false; // Objects are the same
   }
   

   render() {

      return (
         <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            {!this.state.isBoundryRemoved && (
               <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px', zIndex: 1, }}>
                  <Button
                     style={{
                        // background: 'rgb(242, 250, 255)',
                        // border: '2px solid rgb(0, 106, 255)',
                        // color: 'rgb(42, 42, 51)',
                        // padding: '6px 16px',
                        // transition: 'all 0.2s ease 0s, visibility 0s ease 0s',
                        // borderRadius: '0'
                     }}
                     variant="primary"
                     type="button"
                     onClick={this.removeBoundry}
                     className='rboundry'
                  >
                     Remove Boundry
                     <i style={{ paddingLeft: 10, verticalAlignn: 'middle' }} class="fa-solid fa-xmark"></i>
                  </Button>
               </div>
            )}

            <GoogleMapReact
               defaultZoom={MAP.defaultZoom}
               defaultCenter={MAP.defaultCenter}
               options={MAP.options}
               onGoogleApiLoaded={({ map, maps }) =>
                  this.handleMapLoad(map, maps)
               }
               yesIWantToUseGoogleMapApiInternals
               bootstrapURLKeys={{
                  key: 'AIzaSyCAWlcqS-mtuc60y3o_Xhc9Tkqo5N2UM2w',
               }}
               onChange={this.handleMapChanges}
            >
               {this.renderMarker()}
               {this.props.locations.map((location, index) => (
                  <Marker
                     key={index}
                     lat={location.lat}
                     lng={location.lng}
                     data={location.dataID}
                  />
               ))}
            </GoogleMapReact>
         </div>
      );
   }
}
export default GoogleMap;