import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Button from 'apsl-react-native-button';
import { Container, Header, Content, Form, Item, Input, Label, Text, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image } from 'react-native';
import { UserSL, Loading } from '../middlewares';

function mapStateToProps(state) {
    return {
        isDataLoading: state.AppCurrentState.isDataLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (email, password, goToLogin) => { dispatch(UserSL.signup(email, password, goToLogin)) },
        setDataLoading: () => { dispatch(Loading.setDataLoading()) }
    }
}

class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usernameText: '',
            emailText: '',
            passwordText: '',
        }
    }

    componentWillMount() {
        this.props.setDataLoading();
    }


    signup = () => {

        if (this.state.emailText !== '' && this.state.passwordText !== '' && this.state.usernameText !== '') {

            var validationcode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (validationcode.test(this.state.emailText)) {
                this.props.signup(this.state.emailText, this.state.passwordText, this.props.navigation.navigate);
            }
        }
    }

    goToLogin = () => {
        if (this.props.isDataLoading === false) {
            this.props.navigation.navigate('login')
        }
    }

    render() {

        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header>
                    <Left>
                        <Icon name='arrow-back' onPress={this.goToLogin} />
                    </Left>
                    <Body>
                        <Title>Create Account</Title>
                    </Body>
                </Header>
                <Content padder contentContainerStyle={style.contentStyle}>
                    <Form style={style.formStyle}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(usernameText) => { this.setState({ usernameText }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                        </Item>
                    </Form>

                    <Button onPress={this.signup} style={style.loginBtn} isLoading={this.props.isDataLoading}><Text>Signup</Text></Button>
                </Content>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    loginBtn: { marginTop: 9 },
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
