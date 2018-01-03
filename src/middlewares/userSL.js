import Actions from '../actions/actions';
import { Alert } from 'react-native';
import * as firebase from 'firebase';

export class UserSL {

    static signup(email, password, goToLogin) {
        return (dispatch) => {

            dispatch(Actions.setDataLoading(true))

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    var userId = firebase.auth().currentUser.uid;

                    firebase.database().ref('users/' + userId).set({
                        placesToVisit: false
                    })
                        .then(() => {
                            dispatch(Actions.currentUser(userId));
                            dispatch(Actions.placesToVisit([]));
                            dispatch(Actions.clearDirection());
                            dispatch(Actions.setLoginState(true));
                            dispatch(Actions.setDataLoading(false))
                            goToLogin('map');
                        })
                        .catch((error) => {
                            Alert.alert(
                                'error',
                                error.message
                            )
                            dispatch(Actions.setDataLoading(false))
                        })
                })
                .catch((error) => {
                    Alert.alert(
                        'error',
                        error.message
                    )
                    dispatch(Actions.setDataLoading(false))
                })
        }
    }

    static login(email, password, goToMap) {
        return (dispatch) => {

            dispatch(Actions.setDataLoading(true));

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    var userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('users/' + userId + '/placesToVisit').once('value', (snap) => {

                        dispatch(Actions.setLoginState(true));
                        dispatch(Actions.setDataLoading(false));

                        if (snap.val() == false) {
                            dispatch(Actions.currentUser(userId));
                            dispatch(Actions.placesToVisit([]));
                            dispatch(Actions.clearDirection());
                            goToMap('map');
                        }
                        else {
                            dispatch(Actions.currentUser(userId));
                            dispatch(Actions.placesToVisit(snap.val()));
                            dispatch(Actions.clearDirection());
                            goToMap('map');
                        }
                    })
                })
                .catch((error) => {
                    Alert.alert(
                        'error',
                        error.message
                    )
                    dispatch(Actions.setDataLoading(false));
                })
        }
    }

    static logout() {
        return (dispatch) => {
            dispatch(Actions.setLoginState(false));
        }
    }

}