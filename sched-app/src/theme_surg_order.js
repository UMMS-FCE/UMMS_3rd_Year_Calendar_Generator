import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react'

import * as Actions from './actions';

const thematic_surgery_order_options = [
    {text: "Gen-Specialty-OB/GYN",
     value: "Gen-Specialty-OB/GYN"},
    {text: "Gen-OB/GYN-Specialty",
     value: "Gen-OB/GYN-Specialty"},
    {text: "OB/GYN-Gen-Specialty",
     value: "OB/GYN-Gen-Specialty"},
    {text: "OB/GYN-Specialty-Gen",
     value: "OB/GYN-Specialty-Gen"},
    {text: "Specialty-OB/GYN-Gen",
     value: "Specialty-OB/GYN-Gen"},
    {text: "Specialty-Gen-OB/GYN",
     value: "Specialty-Gen-OB/GYN"}
];

class ThematicSurgeryOrderDropdown extends React.Component {
    render(){
        return (
            <Dropdown
              placeholder='select surgery order'
              fluid
              selection
              options={thematic_surgery_order_options}
              onChange={(e, d) => this.props.actions.setThematicSurgeryOrder(d)}
              />
        );
    }
}

const mapStateToProps = (state) => ({
    thematic_surgery_order: state.main.thematic_surgery_order,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ThematicSurgeryOrderDropdown);
