import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

import { DateRangeSelect } from './utils';
import * as Actions from './actions';
import NamedDateSelect from './theme_dates_date_select';

class NamedDateRangeSelect extends React.Component {
    render(){
        return (
            <Grid.Row>
              <Grid.Column>
                {this.props.title}
                <DateRangeSelect dates={this.props.dates.join(' - ')}
                                 onChange={this.props.onChange} />
              </Grid.Column>
            </Grid.Row>
        );
    }
}

class ThemeDates extends React.Component {
    render(){
        let a = [];
        for(const [idx, date] of this.props.dates.entries()){
            const title = date[0];
            const dateOrDates = date[1];
            if(2 === dateOrDates.length){
                let c = (<NamedDateRangeSelect key={[idx, title]}
                         title={title}
                         dates={dateOrDates}
                         block={this.props.block}
                         idx={idx}
                         />);
                a.push(c);
            } else {
                let c = (<NamedDateSelect key={[idx, title]}
                         title={title}
                         date={dateOrDates[0]}
                         block={this.props.block}
                         idx={idx}
                         />);
                a.push(c);
            }
        }

        return (
            <Grid container columns={2}>
              {a}
            </Grid>);
    }
}

const mapStateToProps = (state, props) => ({
    dates: state[props.block],
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemeDates);
