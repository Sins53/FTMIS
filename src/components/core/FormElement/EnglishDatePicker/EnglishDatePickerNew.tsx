// import React, { useEffect, useRef, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './EnglishDatepicker.scss';

// interface DateProps {
//   id?: string;
//   name?: string;
//   className?: string;
//   placement?: string;
//   popperModifiers?: { [key: string]: any };
//   wrapperClassName?: string;
//   handleChange: (date: any) => void;
//   handleBlur?: () => void;
//   value?: any;
//   minDate?: any;
//   maxDate?: any;
//   minTime?: any;
//   maxTime?: any;
//   showTimeSelect?: boolean;
//   disabled?: boolean;
// }
// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December'
// ];
// const EnglishDatePicker: React.SFC<DateProps> = (props) => {
//   const {
//     id,
//     name,
//     disabled = false,
//     className,
//     popperModifiers,
//     wrapperClassName = '',
//     value,
//     minDate,
//     maxDate,
//     minTime,
//     maxTime,
//     handleChange,
//     showTimeSelect,
//     handleBlur
//     // date,
//     // changeYear,
//     // changeMonth,
//     // decreaseMonth,
//     // increaseMonth,
//     // prevMonthButtonDisabled,
//     // nextMonthButtonDisabled,
//   } = props;
//   const _calendar: any = useRef<DatePicker>();

//   const [selectedDate, setselectedDate] = useState<Date | null | undefined>(null);
//   // If invalid date
//   useEffect(() => {
//     try {
//       if (value) {
//         const date = new Date(value);
//         const currentValue = date.getTime() ? date : null;
//         setselectedDate(currentValue);
//       } else {
//         setselectedDate(null);
//       }
//     } catch (e) {
//       setselectedDate(null);
//     }
//   }, [value]);

//   return (
//     <div className="form-control-icon rft">
//       <DatePicker
//         renderCustomHeader={({
//           date,
//           changeYear,
//           changeMonth,
//           decreaseMonth,
//           increaseMonth,
//           prevMonthButtonDisabled,
//           nextMonthButtonDisabled
//         }) => (
//           <>
//             <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
//               {'<'}
//             </button>
//             <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
//               {years.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={months[getMonth(date)]}
//               onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
//               {months.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>

//             <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
//               {'>'}
//             </button>
//           </>
//         )}
//         onBlur={handleBlur}
//         ref={_calendar}
//         id={id}
//         autoComplete={'off'}
//         name={name}
//         wrapperClassName={`${wrapperClassName} d-block`}
//         className={className}
//         selected={selectedDate}
//         minDate={minDate ? new Date(minDate) : null}
//         maxDate={maxDate ? new Date(maxDate) : null}
//         minTime={minTime}
//         maxTime={maxTime}
//         onChange={handleChange}
//         onChangeRaw={(e) => e.preventDefault()} //Disables input
//         showTimeSelect={showTimeSelect}
//         timeFormat="HH:mm"
//         timeIntervals={15}
//         timeCaption="Time"
//         popperPlacement={'bottom-start'}
//         popperModifiers={popperModifiers}
//         dateFormat={showTimeSelect ? 'yyyy-MM-dd h:mm aa' : 'yyyy-MM-dd'}
//         showYearDropdown
//         showMonthDropdown
//         disabled={disabled}
//       />
//       <i className="ic-calendar" onClick={() => _calendar.current?.setOpen(true)}></i>
//     </div>
//   );
// };

// export default EnglishDatePicker;

import React from 'react';

export default function EnglishDatePickerNew() {
  return <div>EnglishDatePickerNew</div>;
}
