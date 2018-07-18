import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Header } from 'semantic-ui-react';

import { DateSelect } from './utils';
import * as Actions from './actions';

class NamedDateSelect extends React.Component {
    render(){
        const title = this.props.date[0];
        const date = this.props.date[1][0];

        return (
            <Grid.Row>
              <Grid.Column width={12}>
                <Header as="h4" color="red">{title}</Header>
                <DateSelect date={date}
                            onChange={(d) => {
                                this.props.actions.setDates(this.props.block,
                                                            this.props.idx,
                                                            title, [d])
                  }} />
              </Grid.Column>
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
export default connect(mapStateToProps, mapDispatchToProps)(NamedDateSelect);
