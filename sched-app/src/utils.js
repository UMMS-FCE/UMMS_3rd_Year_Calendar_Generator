import React, { Component } from 'react';

import { DateInput } from 'semantic-ui-calendar-react';
import '../node_modules/semantic-ui-calendar-react/dist/css/calendar.min.css';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// for date manipulation
// import Moment from 'moment';
// import { extendMoment } from 'moment-range';
// const moment = extendMoment(Moment);

export class DateSelect extends React.Component {
    render() {
        return (
            <DateInput
              name="date"
              placeholder="Date"
              value={this.props.date}
              iconPosition="left"
              dateFormat="MMMM DD, YYYY"
              onChange={(e, {name, value}) => {
                  this.props.onChange(value);
              }} />
        );
    }
}

export class DateRangeSelect extends React.Component {
    render() {
        const d1 = this.props.dates[0];
        const d2 = this.props.dates[1];

        return (
            <div>
              <DateInput
                name="date"
                placeholder="Date"
                value={d1}
                iconPosition="left"
                dateFormat="MMMM DD, YYYY"
                onChange={(e, {name, value}) => {
                    this.props.onChange([value, d2]);
                }} />
                <br />
                {"to"}
                <DateInput
                  name="date"
                  placeholder="Date"
                  value={d2}
                  iconPosition="left"
                  dateFormat="MMMM DD, YYYY"
                  onChange={(e, {name, value}) => {
                      this.props.onChange([d1, value]);
                  }} />
            </div>
        );
    }
}

export class Export extends Component {
    // from https://stackoverflow.com/a/45017234
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
        ;
    }

    render() {
        return (
            <div>
              <div className="mb5">
                <button onClick={this.printDocument}>Print</button>
              </div>
              <div id="divToPrint" className="mt4"
                   style={{
                       backgroundColor: '#f5f5f5',
                       width: '210mm',
                       minHeight: '297mm',
                       marginLeft: 'auto',
                       marginRight: 'auto'
                   }}>
                <div>Note: Here the dimensions of div are same as A4</div>
                <div>You Can add any component here</div>
              </div>
            </div>);
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
