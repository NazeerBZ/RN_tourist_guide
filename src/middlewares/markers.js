import Actions from '../actions/actions';
import { Alert } from 'react-native';
import * as firebase from 'firebase';

export class Markers {

    static deleteMarker(index, currentUserId) {
        return (dispatch) => {
            console.log(index);
            console.log(currentUserId);

            firebase.database().ref('users/' + currentUserId + '/' + 'placesToVisit/' + index).remove()
                .then(() => {

                    firebase.database().ref('users/' + currentUserId + '/' + 'placesToVisit').once('value', (snap) => {

                        if (snap.val() == null) {
                            firebase.database().ref('users/' + currentUserId).set({
                                placesToVisit: false
                            })
                                .then(() => {
                                    dispatch(Actions.placesToVisit([]));
                                    Alert.alert(
                                        'success',
                                        'deleted successfully'
                                    )
                                })
                                .catch((error) => {
                                    Alert.alert(
                                        'error',
                                        error.message
                                    )
                                })
                        }
                        else {
                            var list = [];
                            snap.forEach((item) => {
                                list.push(item.val());
                            })
                            dispatch(Actions.placesToVisit(list));

                            firebase.database().ref('users/' + currentUserId).set({
                                placesToVisit: list
                            })
                                .then(() => {
                                    Alert.alert(
                                        'success',
                                        'deleted successfully'
                                    )
                                })
                                .catch((error) => {
                                    Alert.alert(
                                        'error',
                                        error.message
                                    )
                                })
                        }
                    })
                })
                .catch((error) => {
                    Alert.alert(
                        'error',
                        error.message
                    )
                })
        }
    }

    static showDirection(source, destination, distanceInKm) {
        return (dispatch) => {
            dispatch(Actions.direction(source, destination, distanceInKm))
        }
    }

    static clearDirection() {
        return (dispatch) => {
            dispatch(Actions.clearDirection());
        }
    }
}