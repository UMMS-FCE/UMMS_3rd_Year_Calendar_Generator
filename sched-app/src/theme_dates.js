import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Message } from 'semantic-ui-react';

import NamedDateSelect from './theme_dates_date_select';
import NamedDateRangeSelect from './theme_dates_date_range_select';
import * as Actions from './actions';

class ThemeDates extends React.Component {
    render(){
        let a = [];
		
        for(const [idx, date] of this.props.dates.entries()){
            const title = date[0];
            const dateOrDates = date[1];

            if(2 === dateOrDates.length){
                let c = (<NamedDateRangeSelect
			 checkbox={this.props.checkbox}
                         title={title}
                         block={this.props.block}
                         idx={idx} />);
                a.push((
		    <span key={[idx, title]}>
		      {c}
		    </span>));
            } else {
                let c = (<NamedDateSelect 
			 checkbox={this.props.checkbox}
                         title={title}
                         block={this.props.block}
                         idx={idx} />);
		a.push((
		    <span key={[idx, title]}>
		      {c}
		    </span>));
            }
        }

        return (
            <Message compact>
              <Message.Content>
                <Message.Header>{this.props.theme}</Message.Header>
                {a}
              </Message.Content>
            </Message>
        );
    }
}

const mapStateToProps = (state, props) => ({
    dates: state.main[props.block],
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemeDates);
