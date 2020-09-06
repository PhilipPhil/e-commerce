import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

const latlng = { lat: 47.49855629475769, lng: -122.14184416996333 }


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }


    onMarkerClick(props, marker, e) {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }



    render() {
        return (
            <div style={{ height: '60vh', width: '100%', position: 'relative' }}>
                <Map
                    google={this.props.google}
                    zoom={10}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                    style={mapStyles}
                    onClick={this.onMapClicked}>

                    <Marker position={{ lat: latlng.lat, lng: latlng.lng }} onClick={this.onMarkerClick} />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div className="text-center">
                            <h5>{this.props.deal.company}</h5>
                            <p style={{marginBottom: "10px"}}>{this.props.deal.address}</p>
                            <a href={'https://www.google.com/search?q='+this.props.deal.company+' '+this.props.deal.address} target="_blank">More</a>
                        </div>
                    </InfoWindow>
                </Map>
            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDZRyf-axOovcZ0KSpEfb5YoKOZW3CYUic'
})(MapContainer);