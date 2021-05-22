import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ date, setDateHandler }) => {
  let strtDate = new Date();
  strtDate.setDate(strtDate.getDate() + 1);
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  return (
    <div>
      <b>Select Date: </b>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        minDate={strtDate}
        maxDate={endDate}
        selected={date}
        onChange={(date1) => setDateHandler(date1)}
        closeOnScroll={true}
      />
    </div>
  );
};

export default DateSelector;
