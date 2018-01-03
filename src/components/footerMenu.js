import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, InputGroup, Text, Input, Icon, Container, List, ListItem, Left, Body, Footer, FooterTab, Button, Content } from 'native-base';
import RNGooglePlaces from 'react-native-google-places';

export class FooterMenu extends React.Component {

    searchBoxChangeHandler = (searchboxText) => {
        this.props.getPlacesPrediction(searchboxText)
    }

    logHimOut = () => {
        const resetNavigationStack = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'login' })
            ],
        });

        this.props.logHimOut(resetNavigationStack);
        this.props.logout();
    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button onPress={this.props.findLocation}>
                        <Icon name="search" />
                        <Text style={style.btnFontSize}>Search</Text>
                    </Button>
                    <Button onPress={this.props.getNearbyPlaces}>
                        <Icon active name="md-pin" />
                        <Text style={style.btnFontSize}>Places</Text>
                    </Button>
                    <Button onPress={this.props.changeView}>
                        <Icon name="md-eye" />
                        <Text style={style.btnFontSize}>View</Text>
                    </Button>
                    <Button onPress={() => { return this.props.goToAllMarkers('allmarkers') }}>
                        <Icon name="md-map" />
                        <Text style={style.btnFontSize}>List</Text>
                    </Button>
                    <Button onPress={this.logHimOut}>
                        <Icon name="md-log-out" />
                        <Text style={style.btnFontSize}>logout</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

const style = {
    btnFontSize: {
        fontSize: 8
    }
}