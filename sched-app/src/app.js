import React, { Component } from 'react';
import './app.css';
import { Message, Grid, Header, List } from 'semantic-ui-react';

import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import '../node_modules/semantic-ui-calendar-react/dist/css/calendar.min.css';

const block1 = [
    { "a_dates": ['2018-05-07', '2018-06-08'] },
    { "interstitial_1":  '2018-06-11' },
    { "b_dates": ['2018-06-12', '2018-07-13']},
    { "c dates": ['2018-07-16', '2018-08-16']},
    { "interstitial_2": '2018-08-17' },
    { "summer_vacation" : ['2018-08-18', '2018-08-26']}
];

class DateSelect extends React.Component {
    state = { date: 'July 5, 2018' };

    render() {
        return (
            <DateInput
              name="date"
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              dateFormat="MMMM DD, YYYY"
              onChange={(e, {name, value}) => {
                  console.log(name, value);
                  this.setState({ [name]: value })
              }} />
        );
    }
}

class DateRangeSelect extends React.Component {
    state = { datesRange: '' };

    render() {
        return (
            <DatesRangeInput
              name="datesRange"
              placeholder="From - To"
              value={this.state.datesRange}
              iconPosition="left"
              dateFormat="MMMM DD, YYYY"
              onChange={(e, {name, value}) => {
                  console.log(name, value);
                  this.setState({ [name]: value })
              }} />
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
