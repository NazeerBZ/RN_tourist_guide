import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'native-base';
import geolib from 'geolib';
import { Container, Header, Content, List, ListItem, Separator, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { Markers } from '../middlewares';

function mapStateToProps(state) {
    return {
        placesToVisit: state.Places.placesToVisit,
        currentUserId: state.CurrentUser.currentUserId,
        currentPosition: state.CurrentLocation.currentPosition,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteMarker: (index, currentUserId) => { dispatch(Markers.deleteMarker(index, currentUserId)) },
        showDirection: (source, destination, distanceInKm) => { dispatch(Markers.showDirection(source, destination, distanceInKm)) }
    }
}

class AllMarkers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            coords: []
        }
    }

    deleteMarker(index, currentUserId) {
        this.props.deleteMarker(index, currentUserId);
    }

    showDirection(lat, lng) {

        var source = {
            latitude: this.props.currentPosition.latitude,
            longitude: this.props.currentPosition.longitude
        }

        var destination = {
            latitude: lat,
            longitude: lng
        }

        // var distanceInKm = this.getDistanceFromLatLonInKm(source.latitude, source.longitude, destination.latitude, destination.longitude);
        var distanceInKm = geolib.convertUnit('km', geolib.getDistance(source, destination));

        // console.log(geolib.convertUnit('km', distanceInKm));

        this.props.showDirection(source, destination, distanceInKm.toFixed());
        this.props.navigation.navigate('map');
    }

    // using the ‘Haversine’ formula.
    getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {

        var R = 6378137; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad function is below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d.toFixed();
    }

    deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name='arrow-back' onPress={() => { this.props.navigation.navigate('map') }} />
                    </Left>
                    <Body>
                        <Title>Places To Visit</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        {
                            this.props.placesToVisit.length !== 0 ?
                                this.props.placesToVisit.map((wantToVisit, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <Body style={style.bodyStyle}>
                                                <Text>{wantToVisit.name}</Text>
                                                <Text note>address: <Text note>{wantToVisit.address}</Text></Text>
                                                <Text note>phone.no: <Text note>{wantToVisit.phoneNumber}</Text></Text>
                                                <Text note>Rating: {wantToVisit.rating ? <Text note>{wantToVisit.rating}</Text> : <Text note>No Rating</Text>}</Text>
                                                <Text note>Webiste: <Text note>{wantToVisit.website}</Text></Text>
                                            </Body>
                                            <View style={style.buttonContainer}>
                                                <Text style={style.itemButtonStyle} onPress={this.deleteMarker.bind(this, index, this.props.currentUserId)}>Delete</Text>
                                                <Text style={style.itemButtonStyle} onPress={this.showDirection.bind(this, wantToVisit.latitude, wantToVisit.longitude)}>Get Direction</Text>
                                            </View>
                                        </ListItem>
                                    )
                                })
                                :
                                null
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMarkers);


const style = {
    bodyStyle: {
        paddingBottom: 10
    },
    itemButtonStyle: {
        color: 'blue',
        marginLeft: 16
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    }
}