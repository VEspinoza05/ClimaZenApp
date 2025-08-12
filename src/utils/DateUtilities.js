export const parseDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const isDateGreaterThanXDays = (targetDate, referenceDate, x) => {
  const futureDate = new Date(referenceDate)
  futureDate.setDate(referenceDate.getDate() + x);

  return targetDate > futureDate;
}