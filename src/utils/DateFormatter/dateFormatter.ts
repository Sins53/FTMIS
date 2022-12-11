import { format } from 'date-fns';

// for uniformity of date format throughout the project
export function dateFormatter(date: Date) {
  return format(date, 'yyyy/MM/dd ');
}

export function dateFormatterForParams(date: Date) {
  return format(date, 'yyyy-MM-dd');
}
