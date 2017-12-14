import React, { Component } from 'react';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';

class Splash extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid centered textAlign="center">
                <Grid.Column>
                <Header size="huge">Telestrations</Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Splash;
