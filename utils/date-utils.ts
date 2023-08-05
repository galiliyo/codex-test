import { startOfWeek, add, startOfDay, getDay } from "date-fns";

// Get the date of the first Sunday before the given date
function getFirstSundayBeforeDate(input: string | Date) {
  const givenDate = typeof input === "string" ? new Date(input) : input;

  const dayInMilliseconds = 86400000; // Number of milliseconds in a day
  const oneWeek = 7 * dayInMilliseconds;

  // Check if the given date is a Sunday
  const dayOfWeek = givenDate.getDay();
  if (dayOfWeek === 0) {
    return givenDate; // Return the given date if it's a Sunday
  }

  // Get the timestamp of the previous Sunday
  const previousSundayTimestamp =
    givenDate.getTime() - dayOfWeek * dayInMilliseconds;

  // Create a new date object from the timestamp
  const previousSunday = new Date(previousSundayTimestamp);

  // Check if the new date is still in the same week or the previous week
  if (previousSunday.getTime() >= givenDate.getTime()) {
    previousSunday.setTime(previousSunday.getTime() - oneWeek);
  }

  return previousSunday;
}

// Convert a time slot number (1-24 of half hour slots) to a string representation of the hour
function timeSlotToHourString(timeSlot: number, dayStart: number) {
  if (dayStart < 0 || dayStart >= 24) {
    throw new Error("dayStart must be between 0 and 23.");
  }

  const totalMinutes = dayStart * 60 + (timeSlot - 1) * 30;
  const hourStr = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minuteStr = String(totalMinutes % 60).padStart(2, "0");

  return `${hourStr}:${minuteStr}`;
}

// Get the ISO week number of the given date - week 1 is the first week with a Thursday in it
function getWeekNumber(date: Date) {
  const tdt = new Date(date);
  const dayn = (date.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

// Get the date of the first Sunday of the given week number in the given year
function getDateOfFirstSundayInWeek(year: number, weekNumber: number) {
  // Calculate the first Thursday of the year
  const firstThursday = getFirstThursdayOfYear(year);

  // Calculate the number of days to add to the first Thursday to get to the desired week's Sunday
  const daysToAdd = (weekNumber - 1) * 7 - 4;

  // Add the days to the first Thursday to get the desired week's Sunday
  const targetDate = add(firstThursday, { days: daysToAdd });

  // Return the start of the target week (Sunday)
  return startOfDay(targetDate);

  function getFirstThursdayOfYear(year: number) {
    // Create a new Date object on January 1st of the given year
    const januaryFirst = new Date(year, 0, 1);

    // Get the day of the week for January 1st (0: Sunday, 1: Monday, ..., 6: Saturday)
    const dayOfWeek = getDay(januaryFirst);

    // Calculate the number of days to add to January 1st to get to the first Thursday
    const daysToAdd = dayOfWeek <= 3 ? 4 - dayOfWeek : 11 - dayOfWeek;

    // Add the days to January 1st to get the first Thursday of the year
    return add(januaryFirst, { days: daysToAdd });
  }
}

function formatDateToDDMMHebrew(date: Date) {
  return date.toLocaleDateString("he-IL", {
    day: "2-digit",
  });
}

function addDaysToDate(date: Date, daysToAdd: number) {
  return add(date, { days: daysToAdd });
}

export {
  getFirstSundayBeforeDate,
  timeSlotToHourString,
  getWeekNumber,
  getDateOfFirstSundayInWeek,
  formatDateToDDMMHebrew,
  addDaysToDate,
};
