import React from 'react';

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';

// for date manipulation
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export const DateFormat = 'MMMM D, YYYY';

export class DateSelect extends React.Component {
    state = {focused: false};

    render() {
        return (
            <SingleDatePicker
              id={this.props.key}
              isOutsideRange={() => false}
              date={moment(this.props.date, DateFormat)}
              focused={this.state.focused}
              onDateChange={this.props.onChange}
              onFocusChange={({ focused }) => this.setState({ focused })}
              />
        );
    }
}

export class DateRangeSelect extends React.Component {
    state = {focusedInput: null}

    render() {
        const d1 = moment(this.props.dates[0], DateFormat);
        const d2 = moment(this.props.dates[1], DateFormat);

        return (
            <DateRangePicker
              startDate={d1}
              startDateId="d1"
              endDate={d2}
              endDateId="d2"
              isOutsideRange={() => false}
              onDatesChange={({ startDate, endDate }) => {
                  if(!startDate || !endDate){
                      return;
                  }
                  this.props.onChange([startDate.format(DateFormat),
                                       endDate.format(DateFormat)])
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              />
        );
    }
}

const _getCalendarStart = (referenceDate) => {
    // from semantic-ui-calendar-react
    return referenceDate.clone().startOf('month').startOf('week');
};

export const getArrayOfWeeks = (referenceDate, weeks = 6 ) => {
    // from semantic-ui-calendar-react
    const weeksList = new Array(weeks);
    let day = _getCalendarStart(referenceDate).clone();
    for (let i = 0; i < weeksList.length; i++) {
        weeksList[i] = [];
        for (let j = 0; j < 7; j++) {
            weeksList[i][j] = day.clone();
            day.add(1, 'd');
        }
    }
    return weeksList;
};


export const assert = (condition, message) => {
    // https://stackoverflow.com/a/15313435
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

export const isFamilyTheme = (theme) => {
    return 'Family' === theme;
}
