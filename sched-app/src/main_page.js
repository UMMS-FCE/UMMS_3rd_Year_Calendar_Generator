import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Message, Grid, Header } from 'semantic-ui-react';

import StartDateSelect from './startDateSelect';
import ThematicSectionOrderDropdown from './theme_order';
import ThematicFamilyOrderDropdown from './theme_family_order';
import ThematicSurgeryOrderDropdown from './theme_surg_order';
import ThematicMedOrderDropdown from './theme_med_order';
import ThemeDates from './theme_dates';

import * as Actions from './actions';

class ChooseStartDate extends React.Component {
    render() {
	return (
            <Message icon>
              <Message.Content>
                <Message.Header>Pick Start Date</Message.Header>
		Pick first day of rotations (not including transition course); the rest of the dates will be automatically generated
                <StartDateSelect />
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

class MainPage extends React.Component {
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

        const {thematic_section_order, themes} = this.props;

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
                    <ChooseThematicSectionOrder />
                    {thematic_section_order &&
                     <ChooseRotationOrders
                           themes={themes} />}
                  </Grid.Column>

                  <Grid.Column width={3}>
                    {<ThemeDates block={"block1"}/>}
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {0 && <ThemeDates block={"block2"}/>}
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {0 && <ThemeDates block={"block3"}/>}
                  </Grid.Column>

                </Grid.Row>
              </Grid>
            </React.Fragment>
        );
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
