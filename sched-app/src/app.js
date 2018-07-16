import React, { Component } from 'react';
import './app.css';
import { Message, Grid } from 'semantic-ui-react';

import { DateInput } from 'semantic-ui-calendar-react';
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

class App extends Component {
    render() {
	return (
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Message icon>
                    <Message.Content>
                      <Message.Header>Pick Start Date</Message.Header>
		      <p>
		        <strong>1)</strong>
		        First pick first day of rotations not including transition course, the rest of the dates will be automatically generated
		      </p>
		      <p>
		        <strong>2)</strong>
		        Then download the schedule below after picking rotation orders
		      </p>
		      <label>Start Date (default is 2018-2019 start date):</label>
                      <DateSelect />
                    </Message.Content>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            </Grid>
);
}
}

export default App;
