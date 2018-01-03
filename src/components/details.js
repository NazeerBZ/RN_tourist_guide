import React from 'react';
import { View, Text } from 'native-base';
import { Container, Header, Content, List, ListItem, Separator } from 'native-base';

export class Details extends React.Component {
    render() {
        return (
            <List>
                <Separator>
                    <Text>NAME</Text>
                </Separator>
                <ListItem>
                    <Text style={{ fontSize: 12 }}>{this.props.wantToVisit.name}</Text>
                </ListItem>
                <Separator>
                    <Text>ADDRESS</Text>
                </Separator>
                <ListItem >
                    <Text style={{ fontSize: 12 }}>{this.props.wantToVisit.address}</Text>
                </ListItem>
                <Separator>
                    <Text>PHONE.NO</Text>
                </Separator>
                <ListItem>
                    <Text style={{ fontSize: 12 }}>{this.props.wantToVisit.phoneNumber}</Text>
                </ListItem>
                <Separator>
                    <Text>WEBSITE</Text>
                </Separator>
                <ListItem>
                    <Text style={{ fontSize: 12 }}>{this.props.wantToVisit.website}</Text>
                </ListItem>
                {console.log(this.props.wantToVisit)}
            </List>
        )
    }
} 