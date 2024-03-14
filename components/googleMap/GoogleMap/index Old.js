import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';
import mapStyles from './mapStyles.json';

const MAP = {
  defaultZoom: 1,
  defaultCenter: { lat: 35.2565914, lng: -84.5513343 },
  options: {
    styles: mapStyles,
    maxZoom: 20,
  },
};

export class GoogleMap extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
    },
    clusters: [],
  };

  getClusters = () => {

    const clusters = supercluster(this.props.locations, {
      minZoom: 10,
      maxZoom: 16,
      radius: 60,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          })),
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };
  _onChildClick = (key, childProps) => {
    this.props.temData.forEach(item =>{
      // if(item.latitude === key.lat && item.longitude === key.lng){
      // }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.locations !== this.props.locations) {
      this.createClusters(this.props);
    }
  }

  render() {
    let latCenter = 0;
    let lngCenter = 0;
    let markerCount = 0;
    let bounds = {minLat: 150, maxLat: 0};
    this.state.clusters.map(item => {
      latCenter += item.lat;
      lngCenter += item.lng;
      markerCount++;
      if (item.lat > bounds.maxLat) {
        bounds.maxLat = item.lat;
      }
      if (item.lat < bounds.minLat) {
        bounds.minLat = item.lat;
      }
    });
    if (markerCount > 0) {
      MAP.defaultCenter = { lat: Number(latCenter/markerCount), lng: Number(lngCenter/markerCount) };
    }
    if (markerCount > 1) {
      MAP.defaultZoom = Number(20/(bounds.maxLat - bounds.minLat));
    }
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          zoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          center={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: 'AIzaSyBFPyBwV4k62Oap7_BzlF8ePF7rh19WfqA' }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  data={item.points[0].dataID}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
