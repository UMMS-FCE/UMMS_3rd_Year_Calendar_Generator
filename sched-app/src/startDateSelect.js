import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {DateSelect} from './utils';
import * as Actions from './actions';

class StartDateSelect extends React.Component {
    render(){
        return (
            <DateSelect date={this.props.startDate}
                        onChange={(d) => this.props.actions.setStartDate(d)} />
        );
    }
}

const mapStateToProps = (state) => ({
    startDate: state.main.startDate,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartDateSelect);
