import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Message, Grid } from 'semantic-ui-react';

import * as Actions from './actions';
import { getArrayOfWeeks, isFamilyTheme } from './utils';

// for date manipulation
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class Week extends React.Component {
    render(){
        const {month, weekObj, allDays} = this.props;

        let a = [];

        for(const day of weekObj){
            const inThisMonth = month === day.format('MMMM');
            const dayNum = day.date();
            const textStyle = {};
            if(!inThisMonth){
                textStyle["color"] = 'grey';
            }

            const tdStyle = {};
            const dayStr = day.format('MMMM D, YYYY');
            if(allDays.hasOwnProperty(dayStr)){
                if(inThisMonth){
                    tdStyle["backgroundColor"] = allDays[dayStr];
                }
            }

            a.push(
                <td style={tdStyle} key={day.format('MMDD')} >
                  <span style={textStyle}>
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
            a.push(<Week month={month}
                   allDays={this.props.allDays}
                   weekObj={weekObj}
                   key={idx} />);
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
    computeDays = () => {
        let allDays = {};
        const {block1, block2, block3, fces1, fces2, fces3} = this.props;
        const {colors, themes} = this.props;

        let blocks = [block1, block2, block3];
        if(!isFamilyTheme(themes[0])){
            blocks.push(fces1);
        }
        if(!isFamilyTheme(themes[1])){
            blocks.push(fces2);
        }
        if(!isFamilyTheme(themes[2])){
            blocks.push(fces3);
        }

        for(const block of blocks){
            for(const e of block){
                const title = e[0];
                const dates = e[1];
                if(1 === dates.length){
                    if(!colors.hasOwnProperty(title)){
                        console.log("missing", title);
                    }
                    allDays[dates[0]] = colors[title];
                } else {
                    const s = moment(dates[0], 'MMMM D, YYYY');
                    const e = moment(dates[1], 'MMMM D, YYYY');

                    const wy = moment.range(s, e);
                    for(const dayObj of wy.by('day')){
                        const day = dayObj.format('MMMM D, YYYY');
                        if(!colors.hasOwnProperty(title)){
                            console.log("missing", title);
                        }
                        allDays[day] = colors[title];
                    }
                }
            }
        }

        return allDays;
    }

    render(){
        const allDays = this.computeDays();

        const sd = moment(this.props.startDate, 'MMMM D, YYYY');
        const ed = moment(this.props.endDate, 'MMMM D, YYYY');

        const wy = moment.range(sd, ed);
        let months = []

        for (let monthObj of wy.by('month')) {
            months.push(<Month monthObj={monthObj}
                        key={monthObj.format('MM-YYYY')}
                        allDays={allDays} />);
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
    block1: state.main.block1,
    block2: state.main.block2,
    block3: state.main.block3,
    fces1: state.main.fces1,
    fces2: state.main.fces2,
    fces3: state.main.fces3,
    colors: state.main.colors,
    themes: state.main.themes,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
