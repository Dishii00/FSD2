// Date Utility Functions for Calendar Scheduling (Exp 1.4.1)

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Format Date object to 'YYYY-MM-DD'
export function formatDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format Date to 'August 2026'
export function formatMonthTitle(date) {
  const d = new Date(date);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

// Generate Month Matrix (Grid array of date objects)
export function getMonthMatrix(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
  const totalDays = lastDayOfMonth.getDate();

  const days = [];

  // Previous Month Days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({
      date: prevDate,
      dateString: formatDateString(prevDate),
      dayNumber: prevDate.getDate(),
      isCurrentMonth: false,
    });
  }

  // Current Month Days
  for (let i = 1; i <= totalDays; i++) {
    const currDate = new Date(year, month, i);
    days.push({
      date: currDate,
      dateString: formatDateString(currDate),
      dayNumber: i,
      isCurrentMonth: true,
      isToday: formatDateString(currDate) === formatDateString(new Date()),
    });
  }

  // Next Month Days (fill remaining cells to make full grid)
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      dateString: formatDateString(nextDate),
      dayNumber: i,
      isCurrentMonth: false,
    });
  }

  return days;
}

// Get 7 Days of the Current Week
export function getWeekDays(currentDate) {
  const d = new Date(currentDate);
  const dayOfWeek = d.getDay();
  const diffToSun = d.getDate() - dayOfWeek;

  const week = [];
  for (let i = 0; i < 7; i++) {
    const wDate = new Date(d.setDate(diffToSun + i));
    week.push({
      date: wDate,
      dateString: formatDateString(wDate),
      dayName: WEEKDAY_NAMES[i],
      dayNumber: wDate.getDate(),
      isToday: formatDateString(wDate) === formatDateString(new Date()),
    });
  }
  return week;
}
