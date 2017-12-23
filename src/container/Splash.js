import React, { Component } from 'react';
import { Button, Divider, Grid, Header, Icon, Input, Label, Segment } from 'semantic-ui-react';

class Splash extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid textAlign="center" padded="vertically">
                <Grid.Column>
                    <Header size="huge">Telestrations</Header>
                    <Divider />                    
                    <Segment basic>
                        <Header size="medium">Active Games</Header>
                        <Button className="sm-pad" as='div' labelPosition='right'>
                            <Button color='blue'>
                                <Icon name='users' />
                                Gojavid
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>2</Label>
                        </Button>
                        <Button className="sm-pad" as='div' labelPosition='right'>
                            <Button color='blue'>
                                <Icon name='users' />
                                Johnny
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>4</Label>
                        </Button>
                        <Button className="sm-pad" as='div' labelPosition='right'>
                            <Button color='blue'>
                                <Icon name='users' />
                                Tabitha
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>0</Label>
                        </Button>
                    </Segment>
                    <Header size="medium">Host a New Game</Header>
                    <Input placeholder="What should we call it?" size="huge" style={{ display: 'block' }} />
                    <Button style={{ marginTop: '20px' }} color="green" size="massive">Create</Button>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Splash;
