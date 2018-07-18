import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react'

import * as Actions from './actions';

const thematic_family_order_options = [
    {text: "Peds-Family-Psych",
     value: "Peds-Family-Psych"},
    {text: "Peds-Psych-Family",
     value: "Peds-Psych-Family"},
    {text: "Psych-Peds-Family",
     value: "Psych-Peds-Family"},
    {text: "Psych-Family-Peds",
     value: "Psych-Family-Peds"},
    {text: "Family-Psych-Peds",
     value: "Family-Psych-Peds"},
    {text: "Family-Peds-Psych",
     value: "Family-Peds-Psych"}
];

class ThematicFamilyOrderDropdown extends React.Component {
    render(){
        return (
            <Dropdown
              placeholder='select family order'
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
