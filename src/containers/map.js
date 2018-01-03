import React from 'react';
import { connect } from 'react-redux';
import { Alert, Image } from 'react-native';
import { Container, Text, View, Content, Form, Item, Input, Label, Button, Body, Title, Right, Left, Icon, Header } from 'native-base';
import Polyline from '@mapbox/polyline';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Location, Markers, UserSL } from '../middlewares';
import { FooterMenu, Details } from '../components';

function mapStateToProps(state) {
    return {
        currentRegion: state.CurrentLocation.currentRegion,
        currentPosition: state.CurrentLocation.currentPosition,
        placesToVisit: state.Places.placesToVisit,
        currentUserId: state.CurrentUser.currentUserId,
        source: state.Places.source,
        destination: state.Places.destination,
        distanceInKm: state.Places.distanceInKm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        watchCurrentPosition: () => { dispatch(Location.watchCurrentPosition()) },
        getCurrentLocation: () => { dispatch(Location.getCurrentLocation()) },
        clearWatch: () => { dispatch(Location.clearWatch()) },
        findLocation: () => { dispatch(Location.findLocation()) },
        getNearbyPlaces: (currentRegion, currentUserId) => { dispatch(Location.getNearbyPlaces(currentRegion, currentUserId)) },
        clearDirection: () => { dispatch(Markers.clearDirection()) },
        logout: () => { dispatch(UserSL.logout()) }
    }
}

class Map extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            type: 'standard',
            coords: []
        }
    }

    componentWillMount() {
        this.props.getCurrentLocation();
    }

    componentDidMount() {
        // this.props.watchCurrentPosition();
    }

    showDirection = () => {

        if (this.props.source.latitude && this.props.destination.latitude) {
            var slat = this.props.source.latitude;
            var slng = this.props.source.longitude;

            var dlat = this.props.destination.latitude;
            var dlng = this.props.destination.longitude;

            this.getDirection(slat + ',' + slng, dlat + ',' + dlng);
        }
    }

    async getDirection(startLoc, destinationLoc) {

        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return {
                latitude: point[0],
                longitude: point[1]
            }
        })
        this.setState({ coords: coords })
        return coords;
    }

    componentWillUnmount() {
        this.props.clearWatch()
    }

    findLocation = () => {
        this.props.findLocation()
    }

    getNearbyPlaces = () => {
        this.props.getNearbyPlaces(this.props.currentRegion, this.props.currentUserId);
    }

    getDetails(wantToVisit) {
        this.props.getDetails(wantToVisit);
    }

    changeView = () => {
        Alert.alert(
            'Map View',
            'change your map view using following types',
            [
                { text: 'standard', onPress: () => this.setState({ type: 'standard' }) },
                { text: 'satellite', onPress: () => this.setState({ type: 'satellite' }) },
                { text: 'terrain', onPress: () => this.setState({ type: 'terrain' }) },
            ]
        )
    }

    closeDirectionView = () => {
        this.props.clearDirection();
        this.props.navigation.navigate('map');
    }

    render() {
        // console.log(this.props.currentPosition)
        // console.log(this.props.currentRegion)
        // console.log(this.props.placesToVisit);
        // console.log(this.props.currentUserId);
        // console.log(this.props.source);
        // console.log(this.props.destination);

        return (
            <Container style={style.container}>
                {
                    this.props.source.latitude && this.props.destination.latitude ?
                        <Header>
                            <Left>
                                <Icon name='arrow-back' onPress={this.closeDirectionView} />
                            </Left>
                            <Body style={{flexDirection: 'row'}}>
                                <Image source={require('../../images/live.png')} style={{marginRight: 10, marginTop: 5}} />
                                <Title>{this.props.distanceInKm} Km</Title>
                            </Body>
                            <Right />
                        </Header>
                        :
                        null
                }

                {
                    this.props.currentPosition.latitude && this.props.currentRegion.latitude ?
                        <MapView
                            provide={PROVIDER_GOOGLE}
                            region={this.props.currentRegion}
                            style={style.container}
                            mapType={this.state.type}
                        >
                            <MapView.Marker
                                coordinate={this.props.currentPosition}
                                title='nazeer'
                                description='this is me'
                                pinColor='green'
                            />

                            {
                                this.props.placesToVisit.length !== 0 ?
                                    this.props.placesToVisit.map((wantToVisit, index) => {
                                        return (
                                            <MapView.Marker
                                                key={index}
                                                coordinate={{
                                                    latitude: wantToVisit.latitude,
                                                    longitude: wantToVisit.longitude
                                                }}
                                                title={wantToVisit.name}
                                                description={wantToVisit.address}
                                            >
                                            </MapView.Marker>
                                        )
                                    })
                                    :
                                    null
                            }

                            <MapView.Polyline
                                coordinates={this.state.coords}
                                strokeWidth={2}
                                strokeColor="red" />
                            {this.showDirection()}
                        </MapView>
                        :
                        <Text>Loading Map</Text>
                }

                {
                    this.props.source.latitude && this.props.destination.latitude ?
                        null
                        :
                        <FooterMenu
                            findLocation={this.findLocation}
                            getNearbyPlaces={this.getNearbyPlaces}
                            changeView={this.changeView}
                            goToAllMarkers={this.props.navigation.navigate}
                            logHimOut={this.props.navigation.dispatch}
                            logout={this.props.logout}
                        />
                }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);

const style = {
    container: {
        flex: 1
    }
}