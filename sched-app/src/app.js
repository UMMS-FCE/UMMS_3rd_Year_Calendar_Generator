import React, { Component } from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import './app.css';
import { Message, Grid, Header, List } from 'semantic-ui-react';

import StartDateSelect from './startDateSelect';

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
                <StartDateSelect />
              </Message.Content>
            </Message>
        );
    }
}

class AppInner extends Component {
    render() {
        if(0){
            // const d = moment(fces3["a"][0]);
            // const weeks = getArrayOfWeeks(d);
            // console.log(weeks);

            // const dr = moment.range(fces3["a"]);
            // console.log(fces3["a"]);
            // for (let day of dr.by('day')) {
            //     console.log(day.format('YYYY-MM-DD'));
            // }

            // const wy = moment.range(StartDate, EndDate);
            // for (let month of wy.by('month')) {
            //     console.log(month.format('MMMM YYYY'));
            //     const weeks = getArrayOfWeeks(month);
            //     for( const week of weeks ){
            //         for( const day of week){
            //             console.log(day.format('MMMM DD, YYYY'));
            //         }
            //     }
            // }
        }

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

let store = createStore(reducers);

const App = () => (
    <Provider store={ store }>
      <AppInner />
    </Provider>
);

export default App;
