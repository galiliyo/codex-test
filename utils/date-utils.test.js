import {
  getDateOfFirstSundayInWeek,
  getFirstSundayBeforeDate,
  getWeekNumber,
} from "./date-utils";

describe.skip("getFirstSundayBeforeDate", () => {
  test("Should return the given date if it is a Sunday", () => {
    const givenDate = new Date("2023-09-03"); // A Sunday
    const result = getFirstSundayBeforeDate(givenDate);
    expect(result).toEqual(givenDate);
  });

  test("Should return the correct date for a date during the week", () => {
    const givenDate = new Date("2023-08-04"); // A Thursday
    const result = getFirstSundayBeforeDate(givenDate);
    const expectedDate = new Date(new Date("2023-07-30")); // The previous Sunday
    expect(result).toEqual(expectedDate);
  });

  test("Should return the correct date for a date on Monday", () => {
    const givenDate = new Date("2023-08-07"); // A Monday
    const result = getFirstSundayBeforeDate(givenDate);
    const expectedDate = new Date("2023-08-06"); // The same day, which is a Sunday
    expect(result).toEqual(expectedDate);
  });

  test("Should return the correct date for a date on Tuesday", () => {
    const givenDate = new Date("2023-08-08"); // A Tuesday
    const result = getFirstSundayBeforeDate(givenDate);
    const expectedDate = new Date("2023-08-06"); // The previous Sunday
    expect(result).toEqual(expectedDate);
  });

  test("Should return the correct date for a date on Wednesday", () => {
    const givenDate = new Date("2023-08-09"); // A Wednesday
    const result = getFirstSundayBeforeDate(givenDate);
    const expectedDate = new Date("2023-08-06"); // The previous Sunday
    expect(result).toEqual(expectedDate);
  });

  test("Should return the correct date for a date on Saturday", () => {
    const givenDate = new Date("2023-08-12"); // A Saturday
    const result = getFirstSundayBeforeDate(givenDate);
    const expectedDate = new Date("2023-08-06"); // The previous Sunday
    expect(result).toEqual(expectedDate);
  });
});

describe.skip("getWeekNumber", () => {
  it("should return the correct week number for a given date", () => {
    // Test cases with expected week numbers
    const testCases = [
      { date: new Date("2020-12-28"), expected: 53 },
      { date: new Date("2020-01-04"), expected: 1 },
      { date: new Date("2023-03-03"), expected: 9 },
      { date: new Date("2023-01-01"), expected: 52 }, // First week of the year
      { date: new Date("2023-08-04"), expected: 31 }, // Example date from the prompt
      { date: new Date("2023-12-31"), expected: 52 }, // Last week of the year
    ];

    testCases.forEach((testCase) => {
      const { date, expected } = testCase;
      const weekNumber = getWeekNumber(date);
      expect(weekNumber).toBe(expected);
    });
  });

  it("should handle edge cases and leap years correctly", () => {
    // Test cases for edge cases and leap years
    const testCases = [
      { date: new Date("2020-01-01"), expected: 1 }, // First week of the leap year
      { date: new Date("2020-12-31"), expected: 53 }, // Last week of the leap year
      { date: new Date("2021-01-01"), expected: 53 }, // First week after the leap year
      { date: new Date("2021-12-31"), expected: 52 }, // Last week of the non-leap year
    ];

    testCases.forEach((testCase) => {
      const { date, expected } = testCase;
      const weekNumber = getWeekNumber(date);
      expect(weekNumber).toBe(expected);
    });
  });
});

describe("getDateOfFirstSundayInWeek", () => {
  it("should return the correct date of the first Sunday for a given week number and year", () => {
    // Test cases with expected results
    const testCases = [
      { weekNumber: 1, year: 2023, expected: new Date("2023-01-01") }, // First week of the year
      { weekNumber: 31, year: 2023, expected: new Date("2023-07-30") }, // Example date from the prompt
      { weekNumber: 52, year: 2023, expected: new Date("2023-12-24") }, // Last week of the year
    ];

    testCases.forEach((testCase) => {
      const { weekNumber, year, expected } = testCase;
      const result = getDateOfFirstSundayInWeek(year, weekNumber);
      expect(result.toDateString()).toBe(expected.toDateString());
    });
  });

  it("should handle edge cases for the first week of the year", () => {
    const firstSunday2021 = new Date("2021-01-03");
    const firstSunday2022 = new Date("2022-01-02");
    const firstSunday2023 = new Date("2023-01-01");

    // Testing first week of the year for multiple years
    const result2021 = getDateOfFirstSundayInWeek(2021, 1);
    const result2022 = getDateOfFirstSundayInWeek(2022, 1);
    const result2023 = getDateOfFirstSundayInWeek(2023, 1);

    expect(result2021.toDateString()).toBe(firstSunday2021.toDateString());
    expect(result2022.toDateString()).toBe(firstSunday2022.toDateString());
    expect(result2023.toDateString()).toBe(firstSunday2023.toDateString());
  });
});
