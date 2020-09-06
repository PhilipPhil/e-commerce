import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { lat: 47.49855629475769, lng: -122.14184416996333 }
    }

    render() {
        return (
            <div style={{ height: '60vh', width: '100%', position: 'relative' }}>
                <Map className="googlemap"
                    google={this.props.google}
                    zoom={8}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                    style={mapStyles}>
                    <Marker position={{
                        lat: this.state.lat,
                        lng: this.state.lng
                    }}
                        onClick={() => window.open('https://www.google.com/')} />
                </Map>
            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDZRyf-axOovcZ0KSpEfb5YoKOZW3CYUic'
})(MapContainer);