import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

const APIKEY = ''

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {}
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    componentWillMount() {
        const APIURL = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${this.props.deal.postalcode}&key=${APIKEY}`
        fetch(APIURL)
            .then((response) => response.json())
            .then((data) => this.setState({
                geopin: {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                }
            }))
    }


    onMarkerClick(props, marker, e) {
                this.setState({
                    activeMarker: marker,
                    showingInfoWindow: true
                });
            }

    onMapClicked() {
                if(this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {
        if(this.state.geopin){
            return (
                <div style={{ height: '60vh', width: '100%', position: 'relative' }}>
                    <Map
                        google={this.props.google}
                        zoom={15}
                        initialCenter={{ lat: this.state.geopin.lat, lng: this.state.geopin.lng }}
                        style={mapStyles}
                        onClick={this.onMapClicked}>
    
                        <Marker position={{ lat: this.state.geopin.lat, lng: this.state.geopin.lng }} onClick={this.onMarkerClick} />
    
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div className="text-center">
                                <h5>{this.props.deal.company}</h5>
                                <p style={{ marginBottom: "10px" }}>{this.props.deal.address}</p>
                                <a href={'https://www.google.com/search?q=' + this.props.deal.company + ' ' + this.props.deal.address} target="_blank">More</a>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            );
        } else {
            return(<div style={{ height: '60vh', width: '100%', position: 'relative' }}></div>)
        }

    }
}

export default GoogleApiWrapper({
    apiKey: APIKEY
})(MapContainer);