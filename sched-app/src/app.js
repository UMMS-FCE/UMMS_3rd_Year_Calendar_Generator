import React, { Component } from 'react';
import './app.css';
import { Message, Grid, Header, List } from 'semantic-ui-react';

import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import '../node_modules/semantic-ui-calendar-react/dist/css/calendar.min.css';

class DateSelect extends React.Component {
    state = { date: 'July 5, 2018' };

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            console.log(name, value);
            this.setState({ [name]: value });
        }
    }

    render() {
        return (
            <DateInput
              name="date"
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              dateFormat="MMM DD, YYYY"
              onChange={this.handleChange} />
        );
    }
}

class DateRangeSelect extends React.Component {
    state = { datesRange: '' };

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    render() {
        return (
            <DatesRangeInput
              name="datesRange"
              placeholder="From - To"
              value={this.state.datesRange}
              iconPosition="left"
              onChange={this.handleChange} />
        );
    }
}

class StartDate extends Component {
    render() {
	return (
            <Message icon>
              <Message.Content>
                <Message.Header>Pick Start Date</Message.Header>
		<List ordered>
                  <List.Item>
		    First pick first day of rotations not including transition course, the rest of the dates will be automatically generated
                  </List.Item>
                  <List.Item>
		    Then download the schedule below after picking rotation orders
                  </List.Item>
                </List>
		<label>Start Date (default is 2018-2019 start date):</label>
                <DateSelect />
              </Message.Content>
            </Message>
);
}
}

class App extends Component {
    render() {
	return (
            <Grid>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Header as='h1'>UMMS 3rd Year Calendar Generator</Header>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={3}>
                  <StartDate />
                </Grid.Column>
              </Grid.Row>
            </Grid>
);
}
}

export default App;
