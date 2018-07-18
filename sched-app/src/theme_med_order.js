import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react'

import * as Actions from './actions';

const thematic_med_order_options = [
    {text: "UWards-Community-Neuro/Amp",
     value: "UWards-Community-Neuro/Amp"},
    {text: "UWards-Neuro/Amp-Community",
     value: "UWards-Neuro/Amp-Community"},
    {text: "Neuro/Amp-UWards-Community",
     value: "Neuro/Amp-UWards-Community"},
    {text: "Neuro/Amp-Community-UWards",
     value: "Neuro/Amp-Community-UWards"},
    {text: "Community-Neuro/Amp-UWards",
     value: "Community-Neuro/Amp-UWards"},
    {text: "Community-UWards-Neuro/Amp",
     value: "Community-UWards-Neuro/Amp"}
];

class ThematicMedOrderDropdown extends React.Component {
    render(){
        return (
            <Dropdown
              placeholder='select medicine order'
              fluid
              selection
              options={thematic_med_order_options}
              onChange={(e, d) => this.props.actions.setThematicMedOrder(d)}
              />
        );
    }
}

const mapStateToProps = (state) => ({
    thematic_med_order: state.main.thematic_med_order,
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ThematicMedOrderDropdown);
