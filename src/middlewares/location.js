import Actions from '../actions/actions';
import { Dimensions, Alert } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import * as firebase from 'firebase';

export class Location {

    static getCurrentLocation() {
        return (dispatch) => {

            navigator.geolocation.getCurrentPosition(
                (position) => {

                    var height = Dimensions.get('window').height;
                    var width = Dimensions.get('window').width;
                    var ASPECT_RATIO = height / width;
                    var LATITUDE_DELTA = 0.0922;
                    var LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

                    var currentRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }

                    var currentPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }

                    dispatch(Actions.setCurrentRegion(currentRegion));
                    dispatch(Actions.setCurrentPosition(currentPosition));
                },
                (error) => { Alert.alert('error', error.message) }
            )
        }
    }

    static watchCurrentPosition() {
        return (dispatch) => {

            this.watchID = navigator.geolocation.watchPosition(
                (position) => {

                    var currentPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }

                    dispatch(Actions.setCurrentPosition(currentPosition));
                },
                (error) => { Alert.alert('error', error.message) },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0,
                    distanceFilter: 1
                }
            )
        }
    }

    static clearWatch() {
        return (dispatch) => {
            navigator.geolocation.clearWatch(this.watchID);
            console.log('cleared watch');
        }
    }

    static findLocation() {
        return (dispatch) => {

            RNGooglePlaces.openAutocompleteModal()
                .then((place) => {

                    var height = Dimensions.get('window').height;
                    var width = Dimensions.get('window').width;
                    var ASPECT_RATIO = height / width;
                    var LATITUDE_DELTA = 0.0922;
                    var LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

                    var currentRegion = {
                        latitude: place.latitude,
                        longitude: place.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }

                    dispatch(Actions.setCurrentRegion(currentRegion));
                })
                .catch(() => { Alert.alert('error', error.message) });
        }
    }

    static getNearbyPlaces(currentRegion, currentUserId) {
        return (dispatch) => {
            RNGooglePlaces.openPlacePickerModal({
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
                radius: 0.01 // 10 meters
            })
                .then((place) => {
                    firebase.database().ref('users/' + currentUserId + '/placesToVisit')
                        .once('value', (snap) => {
                            if (snap.val() == false) {
                                firebase.database().ref('users/' + currentUserId).set({
                                    placesToVisit: [place]
                                })
                                    .then(() => {
                                        dispatch(Actions.placesToVisit([place]));
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }
                            else {
                                var list = snap.val();
                                list.unshift(place);
                                firebase.database().ref('users/' + currentUserId).set({
                                    placesToVisit: list
                                })
                                    .then(() => {
                                        dispatch(Actions.placesToVisit(list))
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }
                        })
                })
                .catch(error => console.log(error.message));
        }
    }
}