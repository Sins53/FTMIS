import React, { useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EnglishDatepicker.scss';

interface DateProps {
  id?: string;
  name?: string;
  className?: string;
  placement?: string;
  popperModifiers?: { [key: string]: any };
  wrapperClassName?: string;
  handleChange: (date: any) => void;
  handleBlur?: () => void;
  value?: any;
  minDate?: any;
  maxDate?: any;
  minTime?: any;
  maxTime?: any;
  showTimeSelect?: boolean;
  disabled?: boolean;
  isClearable?: boolean;
  placeHolderText?: string;
}
const EnglishDatePicker: React.SFC<DateProps> = (props) => {
  const {
    id,
    name,
    disabled = false,
    className,
    popperModifiers,
    wrapperClassName = '',
    value,
    minDate,
    maxDate,
    minTime,
    maxTime,
    handleChange,
    showTimeSelect,
    handleBlur,
    isClearable = true,
    placeHolderText
  } = props;
  const _calendar: any = useRef<DatePicker>();

  const [selectedDate, setselectedDate] = useState<Date | null | undefined>(null);
  // If invalid date
  useEffect(() => {
    try {
      if (value) {
        const date = new Date(value);
        const currentValue = date.getTime() ? date : null;
        setselectedDate(currentValue);
      } else {
        setselectedDate(null);
      }
    } catch (e) {
      setselectedDate(null);
    }
  }, [value]);

  function range(start: number, end: number) {
    return Array(end - start + 1)
      .fill(start)
      .map((_, idx) => start + idx);
  }

  const currentDate = new Date();
  const startYear = 1920;

  const years = range(startYear, currentDate.getFullYear() + 50);

  // const years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000];
  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    []
  );

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);

  useEffect(() => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      setSelectedYear(currentDate.getFullYear());
      setSelectedMonth(months[currentDate.getMonth()]);
    }
  }, [selectedDate, months]);

  return (
    <div className="form-control-icon rft">
      <DatePicker
        onBlur={handleBlur}
        ref={_calendar}
        id={id}
        autoComplete={'off'}
        name={name}
        wrapperClassName={`${wrapperClassName} d-block`}
        placeholderText={placeHolderText}
        className={className}
        selected={selectedDate}
        minDate={minDate ? new Date(minDate) : null}
        maxDate={maxDate ? new Date(maxDate) : null}
        minTime={minTime}
        maxTime={maxTime}
        onChange={handleChange}
        onChangeRaw={(e) => e.preventDefault()} //Disables input
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        timeIntervals={15}
        popperPlacement={'bottom-start'}
        popperModifiers={popperModifiers}
        dateFormat={showTimeSelect ? 'yyyy-MM-dd h:mm aa' : 'yyyy-MM-dd'}
        showYearDropdown
        showMonthDropdown
        disabled={disabled}
        renderCustomHeader={({ changeYear, changeMonth }) => (
          <div>
            <select
              value={selectedYear}
              onChange={({ target: { value } }) => {
                changeYear(+value);
                setSelectedYear(+value);
              }}>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={({ target: { value } }) => {
                changeMonth(months.indexOf(value));
                setSelectedMonth(value);
              }}>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      />
      {isClearable && selectedDate && (
        <i
          className="ic-close"
          role="button"
          style={{ marginRight: '20px' }}
          onClick={() => handleChange(null)}></i>
      )}
      <i className="ic-calendar" role="button" onClick={() => _calendar.current?.setOpen(true)}></i>
    </div>
  );
};

export default EnglishDatePicker;
