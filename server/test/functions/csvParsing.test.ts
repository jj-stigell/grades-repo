// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { parseGradesFromCsv, parseHeaderFromCsv } from '../../src/controllers/grades';
import { ApiError } from '../../src/types/error';
import { StudentGrades, UserAttainmentGradeData } from '../../src/types/grades';
import { HttpCode } from '../../src/types/httpCode';

function checkError(error: unknown, httpCode: HttpCode, message: string | Array<string>): void {
  expect(error).toBeInstanceOf(ApiError);
  if (error instanceof ApiError) {
    expect(error.statusCode).toBe(httpCode);
    expect(error.message).toBe(typeof message === 'string' ? message : '');
    if (error.multipleErrors) {
      expect(error.multipleErrors).toStrictEqual(message);
    }
  }
}

describe('Test CSV header parser', () => {

  it('should parse correctly formatted header of attainment CSV file', async () => {
    let result: Array<number> = await parseHeaderFromCsv(
      ['StudentNo', 'tag1', 'tag5', 'tag9', 'tag16'], 1
    );
    expect(result.length).toBe(4);
    expect(result).toEqual(expect.arrayContaining([1, 5, 9, 16]));
    expect(result.every((value: number) => !isNaN(value))).toBeTruthy();

    result = await parseHeaderFromCsv(
      ['STUDENTNO', 'tag2', 'tag6', 'tag10'], 2
    );
    expect(result.length).toBe(3);
    expect(result).toEqual(expect.arrayContaining([2, 6, 10]));
    expect(result.every((value: number) => !isNaN(value))).toBeTruthy();

    result = await parseHeaderFromCsv(
      ['studentno', 'tag1'], 1
    );
    expect(result.length).toBe(1);
    expect(result).toEqual(expect.arrayContaining([1]));
    expect(result.every((value: number) => !isNaN(value))).toBeTruthy();
  });

  it('should throw error if parsing fails due to invalid header column', async () => {

    function errorMessage(column: number, tag: string, instanceId: number): string {
      return `Header attainment data parsing failed at column ${column}. `
        + `Could not find an attainment with tag ${tag} in `
        + `course instance with ID ${instanceId}.`;
    }

    try {
      // Third column bad, wrong instance
      await parseHeaderFromCsv(['StudentNo', 'tag1', 'tag2', 'tag5'], 1);

    } catch (error: unknown) {
      checkError(
        error,
        HttpCode.BadRequest,
        [
          errorMessage(3, 'tag2', 1)
        ]
      );
    }

    try {
      // Last column bad, nonexistent tag
      await parseHeaderFromCsv(['StudentNo', 'tag1', 'tag5', 'fake-tag'], 1);
    } catch (error: unknown) {
      checkError(
        error,
        HttpCode.BadRequest,
        [
          errorMessage(4, 'fake-tag', 1)
        ]
      );
    }

    try {
      // Multiple columns bad.
      await parseHeaderFromCsv(['StudentNo', 'tag2', '', 'fake-tag'], 1);
    } catch (error: unknown) {
      checkError(
        error,
        HttpCode.BadRequest,
        [
          errorMessage(2, 'tag2', 1),
          errorMessage(3, '', 1),
          errorMessage(4, 'fake-tag', 1)
        ]
      );
    }
  });

  it('should throw error if parsing fails due to having only the first header column', async () => {
    try {
      await parseHeaderFromCsv(['StudentNo'], 1);
    } catch (error: unknown) {
      checkError(
        error,
        HttpCode.BadRequest,
        'No attainments found from the header, please upload valid CSV.'
      );
    }
  });

});

describe('Test CSV student grades parser', () => {

  it('should parse correctly formatted grades in the CSV file', () => {
    const studentGradingData: Array<Array<string>> = [
      [ '111111', '12', '32', '3', '3', '7' ],
      [ '222222', '0', '15', '2', '3', '18' ],
      [ '333333', '6', '9', '43', '0', '0' ],
      [ '444444', '36', '3', '6', '2', '8' ],
      [ '555555', '12', '0', '7', '6', '13' ],
      [ '666666', '16', '4', '0', '15', '2' ]
    ];
    const attainmentIds: Array<number> = [1, 2, 3, 4, 5];
    const result: Array<StudentGrades> = parseGradesFromCsv(studentGradingData, attainmentIds);

    result.forEach((student: StudentGrades, index: number) => {
      const rowData: Array<string> = studentGradingData[index];
      expect(student.studentNumber).toBe(rowData[0]);

      student.grades.forEach((grade: UserAttainmentGradeData, index: number) => {
        expect(grade.attainmentId).toBe(attainmentIds[index]);
        expect(grade.grade).toBe(Number(rowData[index + 1]));
      });
    });
    expect(result.length).toBe(6);
  });

  it('should throw error if parsing fails due to one non-numeric grading value', () => {
    const studentGradingData: Array<Array<string>> = [
      [ '111111', '12', '32', '3', '3', '7' ],
      [ '222222', '0', '15', '2', '3', '18' ],
      [ '333333', '6', '9', 'XXXX', '0', '0' ],
      [ '444444', '36', '3', '6', '2', '8' ],
      [ '555555', '12', '0', '7', '6', '13' ],
      [ '666666', '16', '4', '0', '15', '2' ]
    ];
    const attainmentIds: Array<number> = [1, 2, 3, 4, 5];

    try {
      parseGradesFromCsv(studentGradingData, attainmentIds);
    } catch (error: unknown) {
      checkError(
        error,
        HttpCode.BadRequest,
        ['CSV file row 4 column 4 expected number, received "XXXX"']
      );
    }
  });

  it('should throw error if parsing fails due to multiple non-numeric grading value', () => {
    const studentGradingData: Array<Array<string>> = [
      [ '111111', '12', '32', '3', '3', 'ZZZZ' ],
      [ '222222', '0', '15', '2', '3', '18' ],
      [ '333333', '6', '9', 'XXXX', '0', '0' ],
      [ '444444', 'YYYY', '3', '6', '2', '8' ],
      [ '555555', '12', '0', '7', '6', '13' ],
      [ '666666', '16', 'AAAA', '0', '15', '2' ]
    ];
    const attainmentIds: Array<number> = [1, 2, 3, 4, 5];

    try {
      parseGradesFromCsv(studentGradingData, attainmentIds);
    } catch (error: unknown) {
      checkError(
        error,
        HttpCode.BadRequest,
        [
          'CSV file row 2 column 6 expected number, received "ZZZZ"',
          'CSV file row 4 column 4 expected number, received "XXXX"',
          'CSV file row 5 column 2 expected number, received "YYYY"',
          'CSV file row 7 column 3 expected number, received "AAAA"'
        ]
      );
    }
  });

});