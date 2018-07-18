import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Header } from 'semantic-ui-react';

import * as Actions from './actions';

class Calendar extends React.Component {
    render(){
        return (
            <React.Fragment>
              <Header as="h3">Calendar</Header>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => ({

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
