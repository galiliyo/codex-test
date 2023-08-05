"use client";

import classes from "./calendar.module.scss";
import {
  addDaysToDate,
  formatDateToDDMMHebrew,
  getDateOfFirstSundayInWeek,
  timeSlotToHourString,
} from "../utils/date-utils";
import { useState } from "react";
import { projectConfig } from "@/data";
export const Calendar = () => {
  const [displayedWeek, setDisplayedWeek] = useState<number>(
    projectConfig.period.start_week,
  );

  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
  const sundayDate = getDateOfFirstSundayInWeek(
    projectConfig.period.year,
    displayedWeek,
  );
  console.log(formatDateToDDMMHebrew(sundayDate));
  const numRows = 28;
  const numCols = 7;
  const getCellContent = (row: number, col: number) => {
    if (col === 0) {
      return timeSlotToHourString(row, 7);
    }
    return `${row}-${col}`;
  };

  function getCellClasses(row: number, col: number) {
    if (row === 0) {
      return classes["grid-cell-header"];
    } else if (col === 0) {
      return classes["grid-cell-time"];
    } else if (col === 6) {
      return ` ${classes["grid-cell"]} ${classes["grid-cell-friday"]}`;
    }
    return classes["grid-cell"];
  }

  const renderGrid = () => {
    const grid = [];
    for (let row = 1; row < numRows; row++)
      for (let col = 0; col < numCols; col++) {
        grid.push(
          <div key={`${row}-${col}`} className={getCellClasses(row, col)}>
            {getCellContent(row, col)}
          </div>,
        );
      }
    return grid;
  };

  return (
    <>
      <div className={classes["grid-header-row"]}>
        <div></div>
        {daysOfWeek.map((day, i) => (
          <div key={day} className={classes["grid-cell-header"]}>
            <div className={classes["header-day"]}>{day}</div>
            <div className={classes["header-date"]}>
              {formatDateToDDMMHebrew(addDaysToDate(sundayDate, i))}
            </div>
          </div>
        ))}
      </div>
      <div className={classes["grid-container"]}>{renderGrid()}</div>
    </>
  );
};

export default Calendar;
