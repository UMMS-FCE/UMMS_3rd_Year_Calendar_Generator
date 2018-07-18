import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react'

import * as Actions from './actions';

const thematic_family_order_options = [
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

class ThematicFamilyOrderDropdown extends React.Component {
    render(){
        return (
            <Dropdown
              placeholder='select order'
              fluid
              selection
              options={thematic_family_order_options}
              onChange={(e, d) => this.props.actions.setThematicFamilyOrder(d)}
              />
        );
    }
}

const mapStateToProps = (state) => ({
    thematic_family_order: state.thematic_family_order,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ThematicFamilyOrderDropdown);
