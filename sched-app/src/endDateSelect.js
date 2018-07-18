import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {DateSelect} from './utils';
import * as Actions from './actions';

class EndDateSelect extends React.Component {
    render(){
        return (
            <DateSelect date={this.props.endDate}
                        onChange={(d) => this.props.actions.setEndDate(d)} />
        );
    }
}

const mapStateToProps = (state) => ({
    endDate: state.main.endDate,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EndDateSelect);
