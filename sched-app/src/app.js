import React, { Component } from 'react';
import './app.css';
import { Segment } from 'semantic-ui-react'

class App extends Component {
    render() {
	return (
	    <React.Fragment>
	      <Segment.Group raised>
		<Segment>
		  <h4>Pick Start Date</h4>
		  <p>
		    <strong>1)</strong>
		    First pick first day of rotations not including transition course, the rest of the dates will be automatically generated
		  </p>
		  <br></br>
		  <p>
		    <strong>2)</strong>
		    Then download the schedule below after picking rotation orders
		  </p>
		  <div id="start_date" className="shiny-date-input form-group shiny-input-container shiny-bound-input">
		    <label className="control-label" for="start_date">Start Date (default is 2018-2019 start date):</label>
		    <input type="text" className="form-control" data-date-language="en" data-date-week-start="0" data-date-format="yyyy-mm-dd" data-date-start-view="month" data-initial-date="2018-05-07">
		    </input>
		  </div>
		</Segment>
	      </Segment.Group>
	    </React.Fragment>
);
}
}

export default App;
