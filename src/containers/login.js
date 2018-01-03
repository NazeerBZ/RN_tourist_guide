import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Button from 'apsl-react-native-button';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, View, Text } from 'react-native';
import { UserSL, Loading } from '../middlewares';

function mapStateToProps(state) {
    return {
        isLoggedIn: state.AppCurrentState.isLoggedIn,
        isDataLoading: state.AppCurrentState.isDataLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password, goToMap) => { dispatch(UserSL.login(email, password, goToMap)) },
        setDataLoading: () => { dispatch(Loading.setDataLoading()) }
    }
}

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailText: '',
            passwordText: '',
        }

        if (this.props.isLoggedIn === true) {
            this.props.navigation.navigate('map');
        }
    }

    componentWillMount() {
        this.props.setDataLoading();
    }

    login = () => {

        if (this.state.emailText !== '' && this.state.passwordText !== '') {
            this.props.login(this.state.emailText, this.state.passwordText, this.props.navigation.navigate);
        }
    }

    goToSignup = () => {
        if (this.props.isDataLoading === false) {
            this.props.navigation.navigate('signup')
        }
    }

    render() {
        return (

            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header>
                    <Body>
                        <Title>Tourist Guide</Title>
                    </Body>
                </Header>
                <Content padder contentContainerStyle={style.contentStyle}>
                    <Form style={style.formStyle}>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                        </Item>
                    </Form>

                    <Button onPress={this.login} style={style.loginBtn} isLoading={this.props.isDataLoading}><Text>Login</Text></Button>
                    <Title onPress={this.goToSignup} style={style.createAccountStyle}>Create a new account <Text style={style.signupStyle}>Signup</Text></Title>
                </Content>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    loginBtn: { marginTop: 9 },
    createAccountStyle: { color: 'black', fontSize: 15, marginTop: 7 },
    signupStyle: { color: '#6d62a2' },
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '25%'
    },
    formStyle: {
        width: '100%'
    }
}