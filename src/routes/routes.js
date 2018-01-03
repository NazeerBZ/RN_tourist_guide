import React from 'react';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import Store from '../store/store';
import SnackBar from 'react-native-snackbar-component';
import { AsyncStorage, View, Text, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import Navigations from './navigations';

function mapStateToProps(state) {
    return {
        toastMessage: state.AppCurrentState.toastMessage
    }
}

class Routes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            visible: true
        }
    }

    componentWillMount() {
        persistStore(Store, { storage: AsyncStorage }, () => {
            this.setState({
                loading: true,
                visible: false
            })
            Store.dispatch({ type: 'CLEAR_TOAST_MESSAGE' });
        })
    }

    showToast = () => {

        if (this.props.toastMessage !== '') {

            return (
                <SnackBar visible={true} textMessage={this.props.toastMessage} actionHandler={this.closeToast()} actionText="OKEY" />
            )
        }
    }

    closeToast = () => {

        setTimeout(() => {
            Store.dispatch({ type: 'CLEAR_TOAST_MESSAGE' });
        }, 2000)
    }

    render() {
        if (this.state.loading === true) {
            return (
                <Container>
                    <Navigations />
                    {this.showToast()}
                </Container>
            )
        }
        else {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                    animating={this.state.visible}
                />
            )
        }
    }
}

export default connect(mapStateToProps, null)(Routes);

const style = {
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}