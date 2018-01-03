import React from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import Store from './store/store';
import Routes from './routes/routes';
import { View, Text } from 'react-native';

var config = {
    apiKey: "AIzaSyCciCE23SsXtk0aZ2ggnZO51-hbkmP2ZOc",
    authDomain: "tourist-guide-8b547.firebaseapp.com",
    databaseURL: "https://tourist-guide-8b547.firebaseio.com",
    projectId: "tourist-guide-8b547",
    storageBucket: "tourist-guide-8b547.appspot.com",
    messagingSenderId: "1047452677140"
};
firebase.initializeApp(config);

class App extends React.Component {

    render() {
        return (
            <Provider store={Store}>
                <Routes />
            </Provider>
        )
    }
}

export default App;