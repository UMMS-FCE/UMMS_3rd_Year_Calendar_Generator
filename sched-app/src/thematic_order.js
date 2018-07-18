import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react'

import * as Actions from './actions';

const thematic_section_order_options = [
    {text: "Family-Surgery-Medicine",
     value: "Family-Surgery-Medicine"},
    {text: "Family-Medicine-Surgery",
     value: "Family-Medicine-Surgery"},
    {text: "Medicine-Family-Surgery",
     value: "Medicine-Family-Surgery"},
    {text: "Medicine-Surgery-Family",
     value: "Medicine-Surgery-Family"},
    {text: "Surgery-Medicine-Family",
     value: "Surgery-Medicine-Family"},
    {text: "Surgery-Family-Medicine",
     value: "Surgery-Family-Medicine"}
];

class ThematicSectionOrderDropdown extends React.Component {
    render(){
        return (
            <Dropdown
              placeholder={this.props.thematic_section_order ?
                           this.props.thematic_section_order :
              'Select Thematic Section Order'}
              fluid
              selection
              options={thematic_section_order_options}
              onChange={(e, d) => this.props.actions.setThematicSectionOrder(d)}
              />
        );
    }
}

const mapStateToProps = (state) => ({
    thematic_section_order: state.thematic_section_order,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ThematicSectionOrderDropdown);
