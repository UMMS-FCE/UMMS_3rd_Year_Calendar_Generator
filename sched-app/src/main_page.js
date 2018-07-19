import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Message, Grid, Header, Tab } from 'semantic-ui-react';

import StartDateSelect from './startDateSelect';
import EndDateSelect from './endDateSelect';
import ThematicSectionOrderDropdown from './theme_order';
import ThematicFamilyOrderDropdown from './theme_family_order';
import ThematicSurgeryOrderDropdown from './theme_surg_order';
import ThematicMedOrderDropdown from './theme_med_order';
import ThemeDates from './theme_dates';
import Calendar from './calendar';

import {isFamilyTheme} from './utils';
import * as Actions from './actions';

class ChooseStartDate extends React.Component {
    render() {
	return (
            <Message icon>
              <Message.Content>
                <Message.Header>Pick Start Date</Message.Header>
		Pick first day of rotations (not including transition course)
                <StartDateSelect />
              </Message.Content>
            </Message>
        );
    }
}

class ChooseEndDate extends React.Component {
    render() {
	return (
            <Message icon>
              <Message.Content>
                <Message.Header>Pick End Date</Message.Header>
		Pick last day of rotations (not including transition course)
                <EndDateSelect />
              </Message.Content>
            </Message>
        );
    }
}

class ChooseThematicSectionOrder extends React.Component {
    render() {
        return (
            <Message icon>
              <Message.Content>
                <Message.Header>Thematic Section Order</Message.Header>
                <ThematicSectionOrderDropdown />
              </Message.Content>
            </Message>
        );
    }
}

class ChooseRotationOrders extends React.Component {
    render() {
        const rotations = {
            Family: <ThematicFamilyOrderDropdown key='family' />,
            Surgery: <ThematicSurgeryOrderDropdown key='surg' />,
            Medicine: <ThematicMedOrderDropdown key='med' />};

        let a = []
        for( const r of this.props.themes ){
            a.push(rotations[r]);
        }

        return (
            <Message icon>
              <Message.Content>
                <Message.Header>Rotation</Message.Header>
                {a}
              </Message.Content>
            </Message>
        );
    }
}

class TabFceDates extends React.Component {
    render() {
        const {themes} = this.props;

        return (
            <Tab.Pane>
              <Grid>
                <Grid.Row>
                  { !isFamilyTheme(themes[0]) &&
                      <Grid.Column width={3}>
                            <ThemeDates block={"fces1"}
                                            theme={"Theme 1 FCE weeks"}/>
                          </Grid.Column>
                      }
                      { !isFamilyTheme(themes[1]) &&
                          <Grid.Column width={3}>
                                <ThemeDates block={"fces2"}
                                                theme={"Theme 2 FCE weeks"}/>
                              </Grid.Column>
                          }
                          { !isFamilyTheme(themes[2]) &&
                              <Grid.Column width={3}>
                                    <ThemeDates block={"fces3"}
                                                    theme={"Theme 3 FCE weeks"}/>
                                  </Grid.Column>
                              }

                </Grid.Row>
              </Grid>
            </Tab.Pane>
        );
    }
}

class TabRotationDates extends React.Component {
    render() {
        const {themes} = this.props;
        return (
            <Tab.Pane>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <ThemeDates block={"block1"}
                                theme={themes[0]}/>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <ThemeDates block={"block2"}
                                theme={themes[1]}/>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <ThemeDates block={"block3"}
                                theme={themes[2]}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Tab.Pane>
        );
    }
}

class TabMain extends React.Component {
    render() {
        const {thematic_section_order, themes} = this.props;
        return (
            <Tab.Pane>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <ChooseStartDate />
                    <ChooseEndDate />
                    <ChooseThematicSectionOrder />
                    {thematic_section_order &&
                    <ChooseRotationOrders themes={themes} />}
                  </Grid.Column>
                  <Calendar />
                </Grid.Row>
              </Grid>
            </Tab.Pane>
        );
    }
}

class MainPage extends React.Component {
    render() {
        const {thematic_section_order, themes} = this.props;

        const panes = [
            { menuItem: 'Main', render: () => (
                <TabMain {...{thematic_section_order, themes}} />) },
            { menuItem: 'Adjust Rotation Dates', render: () => (
                <TabRotationDates {...{themes}} /> )},
            { menuItem: 'Adjust FCE Dates', render: () => (
                <TabFceDates {...{themes}} /> ) }
        ];

        return (
            <div>
              <Header as='h1'>
                UMMS 3rd Year Calendar Generator
              </Header>
              <Tab panes={panes} />
            </div>);
    }
}

const mapStateToProps = (state) => ({
    thematic_section_order: state.main.thematic_section_order,
    themes: state.main.themes,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
