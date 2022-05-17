export const getMonday = ( date: Date ) => {
  let tmpDate = new Date(date);
  let day = tmpDate.getDay() || 7;
  if( day !== 1 )
    tmpDate.setHours(-24 * (day - 1));
  return tmpDate;
}

export const eachDayOfTheMonth = (date: Date) => {
  // First day of the month
  let day: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  let previousDayOfMonth: Date = new Date(getMonday(day));
  let days:Date[] = [];

  // Previous days of month
  while ((previousDayOfMonth.getDay() || 7) < (day.getDay() || 7)) {
    days.push(new Date(previousDayOfMonth));
    previousDayOfMonth.setDate(previousDayOfMonth.getDate() + 1);
  }

  // Current days of the month
  while (day.getMonth() === date.getMonth()) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  // Next days of the month
  while (day.getDay() !== 1) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  // Extra Week
  do {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  } while (day.getDay() !== 1);

  return days;
}

export const isSameMonth = (date1: Date, date2: Date): Boolean => {
  return (date1.getMonth() === date2.getMonth());
}

export const isCurrentMonth = (date: Date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth();
}

export const isToday = (date: Date): Boolean => {
  const today = new Date();
  return (date.getFullYear() === today.getFullYear())
          && (date.getMonth() === today.getMonth())
          && (date.getDate() === today.getDate())
}

export const isEqual = (date1: Date, date2:Date): Boolean => {
  return (date1.getFullYear() === date2.getFullYear())
          && (date1.getMonth() === date2.getMonth())
          && (date1.getDate() === date2.getDate())
}
