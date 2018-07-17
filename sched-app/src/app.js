import React, { Component } from 'react';
import './app.css';
import { Message, Grid, Header, List } from 'semantic-ui-react';

import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import '../node_modules/semantic-ui-calendar-react/dist/css/calendar.min.css';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const StartDate = '2018-07-05';
const EndDate = '2019-04-26';

const block1 = [
    { "a_dates": ['2018-05-07', '2018-06-08'] },
    { "interstitial_1": ['2018-06-11'] },
    { "b_dates": ['2018-06-12', '2018-07-13']},
    { "c dates": ['2018-07-16', '2018-08-16']},
    { "interstitial_2": ['2018-08-17'] },
    { "summer_vacation" : ['2018-08-18', '2018-08-26']}
];

const block2 = [
    { "a_dates": ['2018-08-27', '2018-09-28'] },
    { "b_dates": ['2018-10-01', '2018-10-31'] },
    { "interstitial_3": ['2018-11-01'] },
    { "careers_in_medicine_1": ['2018-11-02'] },
    { "c_dates": ['2018-11-05', '2018-12-13']},
    { "interstitial_4": ['2018-12-14'] },
    { "interstitial_5": ['2018-12-17'] },
    { "careers_in_medicine_2": ['2018-12-18'] },
    { "winter_vacation": ['2018-12-19', '2019-01-01'] }
];

const block3 = [
    { "interstitial_6": ['2019-01-02'] },
    { "a_dates": ['2019-01-03', '2019-02-08'] },
    { "b_dates": ['2019-02-11', '2019-03-15']},
    { "spring_vacation": ['2019-03-16', '2019-03-24'] },
    { "c_dates": ['2019-03-25', '2019-04-25'] },
    { "careers_in_medicine_3": ['2019-04-25'] },
    { "interstitial_7": ['2019-04-26'] }
];

const fces1 = {
    "a": ['2018-06-04', '2018-06-08'],
    "b": ['2018-07-09', '2018-07-13'],
    "c": ['2018-07-16', '2018-07-20']};

const fces2 = {
    "a": ['2018-09-24', '2018-09-28'],
    "b": ['2018-10-01', '2018-10-05'],
    "c": ['2018-11-05', '2018-11-09']};

const fces3 = {
    "a": ['2019-02-04', '2019-02-08'],
    "b": ['2019-03-11', '2019-03-15'],
    "c": ['2019-03-25', '2019-03-29']};

/* from semantic-ui-calendar-react */
const _getCalendarStart = (referenceDate) => {
  return referenceDate.clone().startOf('month').startOf('week');
};

/* from semantic-ui-calendar-react */
const getArrayOfWeeks = (referenceDate, weeks = 6 ) => {
  const weeksList = new Array(weeks);
  let day = _getCalendarStart(referenceDate).clone();
  for (let i = 0; i < weeksList.length; i++) {
    weeksList[i] = [];
    for (let j = 0; j < 7; j++) {
      weeksList[i][j] = day.clone();
      day.add(1, 'd');
    }
  }
  return weeksList;
};


class DateSelect extends React.Component {
    state = { date: StartDate };

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

class ChooseStartDate extends Component {
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
        if(0){
            const d = moment(fces3["a"][0]);
            const weeks = getArrayOfWeeks(d);
            console.log(weeks);

            const dr = moment.range(fces3["a"]);
            console.log(fces3["a"]);
            for (let day of dr.by('day')) {
                console.log(day.format('YYYY-MM-DD'));
            }
        }

        const wy = moment.range(StartDate, EndDate);
        for (let month of wy.by('month')) {
            console.log(month.format('MMMM YYYY'));
            const weeks = getArrayOfWeeks(month);
            for( const week of weeks ){
                for( const day of week){
                    console.log(day.format('MMMM DD, YYYY'));
                }
            }
        }

        return (
            <Grid>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Header as='h1'>UMMS 3rd Year Calendar Generator</Header>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={3}>
                  <ChooseStartDate />
                </Grid.Column>
              </Grid.Row>
            </Grid>
);
}
}

export default App;
