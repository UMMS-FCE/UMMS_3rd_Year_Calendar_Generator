import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Message, Grid, Header } from 'semantic-ui-react';

import * as Actions from './actions';
import { getArrayOfWeeks } from './utils';

// for date manipulation
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class Week extends React.Component {
    render(){
        const {month, weekObj} = this.props;

        let a = [];

        for( const day of weekObj){
            const inThisMonth = month === day.format('MMMM');
            const dayNum = day.date();
            const style = {};
            if(!inThisMonth){
                style["color"] = 'grey';
            }

            a.push(
                <td key={day.format('MMDD')} >
                  <span style={style}>
                    {dayNum}
                  </span>
                </td>);
        }

        return (
            <tr>
              {a}
            </tr>
        );
    }
}

class Month extends React.Component {
    render(){
        const {monthObj} = this.props;
        const month = monthObj.format('MMMM');
        const year = monthObj.format('YYYY');

        const weeks = getArrayOfWeeks(monthObj);

        let a = []
        for( const [idx, weekObj] of weeks.entries() ){
            a.push(<Week month={month} weekObj={weekObj} key={idx} />);
        }

        return (
            <Grid.Column>
              <Message icon>
                <Message.Content>
                  <Message.Header>{month}{" "}{year}</Message.Header>
                  <table>
                    <tbody>
                      {a}
                    </tbody>
                  </table>
                </Message.Content>
              </Message>
            </Grid.Column>
        );
    }
}

class Calendar extends React.Component {
    render(){
        const sd = moment(this.props.startDate, 'MMMM D, YYYY');
        const ed = moment(this.props.endDate, 'MMMM D, YYYY');

        const wy = moment.range(sd, ed);
        let months = []

        for (let monthObj of wy.by('month')) {
            months.push(<Month monthObj={monthObj}
                        key={monthObj.format('MM-YYYY')} />);
        }

        return (
            <Grid container columns={5}>
              {months}
            </Grid>
        );
    }
}

const mapStateToProps = (state, props) => ({
    startDate: state.main.startDate,
    endDate: state.main.endDate,

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
