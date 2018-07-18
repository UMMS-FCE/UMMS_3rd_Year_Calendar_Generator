import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Header } from 'semantic-ui-react';

import { DateRangeSelect } from './utils';
import * as Actions from './actions';

class NamedDateRangeSelect extends React.Component {
    render(){
        const title = this.props.date[0];
        const dates = this.props.date[1];

        const d1 = dates[0];
        const d2 = dates[1];

        return (
            <Grid.Row>
              <Grid.Column width={1}>
                <Header as="h4" color="red">{title}</Header>
              </Grid.Column>

              <DateRangeSelect dates={dates}
                               onChange={(d) => {
                                   this.props.actions.setDates(this.props.block,
                                                               this.props.idx,
                                                               title, d)
                }} />

            </Grid.Row>
        );
    }
}

const mapStateToProps = (state, props) => ({
    date: state.main[props.block][props.idx],
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(NamedDateRangeSelect);
