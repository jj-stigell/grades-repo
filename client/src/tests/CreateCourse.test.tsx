// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateCourseView from '../components/CreateCourseView';
import CreateCourseForm from '../components/create-course-view/CreateCourseForm';

describe('Tests for CreateCourseView components', () => {

  test(
    'CreateCourseView should render the CreateCourseForm and contain'
    + ' all of the appropriate components',
    () => {

      render(
        <BrowserRouter>
          <CreateCourseView />
        </BrowserRouter>
      );

      const headingElement: HTMLElement = screen.getByText('Create a New Course');
      const codeField: HTMLElement = screen.getByLabelText('Course Code*');
      const nameFieldEn: HTMLElement = screen.getByLabelText('Course Name in English*');
      const nameFieldFi: HTMLElement = screen.getByLabelText('Course Name in Finnish*');
      const nameFieldSv: HTMLElement = screen.getByLabelText('Course Name in Swedish*');
      const organizerFieldEn: HTMLElement = screen.getByLabelText('Organizer in English*');
      const organizerFieldFi: HTMLElement = screen.getByLabelText('Organizer in Finnish*');
      const organizerFieldSv: HTMLElement = screen.getByLabelText('Organizer in Swedish*');
      const credsMin: HTMLElement = screen.getByLabelText('Minimum Course Credits (ECTS)*');
      const credsMax: HTMLElement = screen.getByLabelText('Maximum Course Credits (ECTS)*');
      const teachers: HTMLElement = screen.getByLabelText('Teachers In Charge*');
      const addTeacherButton: HTMLElement = screen.getByText('Add');
      const creationButton: HTMLElement = screen.getByText('Create Course');

      expect(headingElement).toBeDefined();
      expect(codeField).toBeDefined();
      expect(nameFieldEn).toBeDefined();
      expect(nameFieldFi).toBeDefined();
      expect(nameFieldSv).toBeDefined();
      expect(organizerFieldEn).toBeDefined();
      expect(organizerFieldFi).toBeDefined();
      expect(organizerFieldSv).toBeDefined();
      expect(credsMin).toBeDefined();
      expect(credsMax).toBeDefined();
      expect(teachers).toBeDefined();
      expect(addTeacherButton).toBeDefined();
      expect(creationButton).toBeDefined();
    }
  );

  test('CreateCourseForm should allow an admin to create a course', async () => {

    const mockCourse: jest.Mock = jest.fn();

    const testCode: string = 'Test code';
    const testNameEn: string = 'Test name';
    const testNameFi: string = 'Testi nimi';
    const testNameSv: string = 'Sama ruotsiksi';
    const testDepartmentEn: string = 'Test department';
    const testDepartmentFi: string = 'Laitos xxx';
    const testDepartmentSv: string = 'samma på svenska';
    const testTeacher: string = 'Elon.Musk@twitter.com';

    render(<CreateCourseForm addCourse={mockCourse} />);

    const codeField: HTMLElement = screen.getByLabelText('Course Code*');
    const nameFieldEn: HTMLElement = screen.getByLabelText('Course Name in English*');
    const nameFieldFi: HTMLElement = screen.getByLabelText('Course Name in Finnish*');
    const nameFieldSv: HTMLElement = screen.getByLabelText('Course Name in Swedish*');
    const organizerFieldEn: HTMLElement = screen.getByLabelText('Organizer in English*');
    const organizerFieldFi: HTMLElement = screen.getByLabelText('Organizer in Finnish*');
    const organizerFieldSv: HTMLElement = screen.getByLabelText('Organizer in Swedish*');
    const credsMin: HTMLElement = screen.getByLabelText('Minimum Course Credits (ECTS)*');
    const credsMax: HTMLElement = screen.getByLabelText('Maximum Course Credits (ECTS)*');
    const teachers: HTMLElement = screen.getByLabelText('Teachers In Charge*');
    const addTeacherButton: HTMLElement = screen.getByText('Add');
    const creationButton: HTMLElement = screen.getByText('Create Course');

    act(() => userEvent.type(codeField, testCode));
    act(() => userEvent.type(nameFieldEn, testNameEn));
    act(() => userEvent.type(nameFieldFi, testNameFi));
    act(() => userEvent.type(nameFieldSv, testNameSv));
    act(() => userEvent.type(organizerFieldEn, testDepartmentEn));
    act(() => userEvent.type(organizerFieldFi, testDepartmentFi));
    act(() => userEvent.type(organizerFieldSv, testDepartmentSv));
    act(() => userEvent.type(credsMin, '3'));
    act(() => userEvent.type(credsMax, '5'));
    act(() => userEvent.type(teachers, testTeacher));

    act(() => userEvent.click(addTeacherButton));
    act(() => userEvent.click(creationButton));

    await waitFor(() => {
      expect(mockCourse).toHaveBeenCalledTimes(1);
      expect(mockCourse).toHaveBeenCalledWith({
        courseCode: testCode,
        minCredits: 3,
        maxCredits: 5,
        department: {
          fi: testDepartmentFi,
          sv: testDepartmentSv,
          en: testDepartmentEn,
        },
        name: {
          fi: testNameFi,
          sv: testNameSv,
          en: testNameEn,
        },
        teachersInCharge: [
          {
            email: testTeacher
          }
        ]
      });
    });
  });

});
