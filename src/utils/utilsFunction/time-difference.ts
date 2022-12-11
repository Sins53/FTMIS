/**
 *
 * @param endDate required
 * @param startDate optional (if not given get the minute difference with current time)
 * @returns minute difference in number
 */
export const timeDifference = (endDate: string | number, startDate?: string | number) => {
  // check if end date is already expired
  if (new Date(endDate).getTime() > 0) {
    // if start date is not given then get the difference using end date and current date
    const difference = startDate
      ? new Date(endDate).getTime() - new Date(startDate).getTime()
      : new Date(endDate).getTime() - new Date().getTime();

    // check if date is negative
    if (difference > 0) {
      const minutesDifference = difference / 1000 / 60;
      console.log(minutesDifference, 'minuteDifference');
      return minutesDifference;
    }
  }
  return 0;
};

/**
 *
 * @param start Start TIme  required
 * @param end End Time
 * @returns string
 */

// export function timeDifference(start: Date | string, end?: Date | string) {
//   const startDate = new Date(start);
//   const endDate = end ? new Date(end) : new Date();
//   let diff = endDate.getTime() - startDate.getTime();
//   let hours = Math.floor(diff / 1000 / 60 / 60);
//   diff -= hours * 1000 * 60 * 60;
//   const minutes = Math.floor(diff / 1000 / 60);

//   // If using time pickers with 24 hours format, add the below line get exact hours
//   if (hours < 0) hours = hours + 24;

//   return hours * 60 + minutes;
// }
