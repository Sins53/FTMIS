export default function formatDate(date?: string | Date, separator: '-' | '/' = '-') {
  if (date) {
    const dateVal: Date = date ? new Date(date) : new Date();
    const day = dateVal.getDate();
    const month = dateVal.getMonth() + 1;
    const year = dateVal.getFullYear();

    const formattedDate =
      year +
      separator +
      (month < 10 ? '0' + month : month) +
      separator +
      (day < 10 ? '0' + day : day);

    return formattedDate;
  }

  return '';
}
