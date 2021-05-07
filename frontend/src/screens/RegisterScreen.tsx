import React, { Component } from 'react';
import DatePicker from 'react-native-date-picker';

export default class DateMode extends Component {
  state = { date: new Date() };

  changeDate = ({ date }) => {
    this.setState({ date });
    console.log(date);
  };
  render() {
    return (
      <DatePicker
        date={this.state.date}
        onDateChange={(date) => this.changeDate({ date })}
        mode="date"
      />
    );
  }
}
