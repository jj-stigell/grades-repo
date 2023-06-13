// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

const mockInstances = [
  {
    id: 1,
    startingPeriod: '2021-2022 Autumn I-II',
    endingPeriod: '2022-2023 Autumn I-II',
    minCredits: 5,
    maxCredits: 5,
    startDate: '2023-02-06',
    endDate: '2023-05-06',
    type: 'Lecture',
    gradingScale: 'General Scale, 0-5',
    teachersInCharge: [
      'Elisa Mekler',
      'David McGookin'
    ],
    courseData: {
      id: 1,
      courseCode: 'CS-C3120',
      department: {
        en: 'Department of computer science',
        fi: 'Department of computer science',
        sv: 'Department of computer science',
      },
      name: {
        en: 'Human-Computer Interaction',
        fi: 'Human-Computer Interaction',
        sv: 'Human-Computer Interaction',
      }
    }
  },
  {
    id: 2,
    startingPeriod: '2021-2022 Autumn I-II',
    endingPeriod: '2022-2023 Autumn I-II',
    minCredits: 5,
    maxCredits: 5,
    startDate: '2023-06-06',
    endDate: '2023-06-06',
    type: 'Exam',
    gradingScale: 'General Scale, 0-5',
    teachersInCharge: [
      'Elisa Mekler'
    ],
    courseData: {
      id: 1,
      courseCode: 'CS-C3120',
      department: {
        en: 'Department of computer science',
        fi: 'Department of computer science',
        sv: 'Department of computer science',
      },
      name: {
        en: 'Human-Computer Interaction',
        fi: 'Human-Computer Interaction',
        sv: 'Human-Computer Interaction',
      }
    }
  },
  {
    id: 3,
    startingPeriod: '2019-2020 Autumn I-II',
    endingPeriod: '2020-2021 Autumn I-II',
    minCredits: 5,
    maxCredits: 5,
    startDate: '2022-09-06',
    endDate: '2023-09-06',
    type: 'Lecture',
    gradingScale: 'General Scale, 0-5',
    teachersInCharge: [
      'Elisa Mekler'
    ],
    courseData: {
      id: 1,
      courseCode: 'CS-C3120',
      department: {
        en: 'Department of computer science',
        fi: 'Department of computer science',
        sv: 'Department of computer science',
      },
      name: {
        en: 'Human-Computer Interaction',
        fi: 'Human-Computer Interaction',
        sv: 'Human-Computer Interaction',
      }
    }
  },
  {
    id: 4,
    startingPeriod: '2019-2020 Autumn I-II',
    endingPeriod: '2020-2021 Autumn I-II',
    minCredits: 5,
    maxCredits: 5,
    startDate: '2021-09-06',
    endDate: '2021-011-06',
    type: 'Lecture',
    gradingScale: 'General Scale, 0-5',
    teachersInCharge: [
      'Elisa Mekler'
    ],
    courseData: {
      id: 1,
      courseCode: 'CS-C3120',
      department: {
        en: 'Department of computer science',
        fi: 'Department of computer science',
        sv: 'Department of computer science',
      },
      name: {
        en: 'Human-Computer Interaction',
        fi: 'Human-Computer Interaction',
        sv: 'Human-Computer Interaction',
      }
    }
  },
  {
    id: 5,
    startingPeriod: '-',
    endingPeriod: '-',
    startDate: '2018-09-06',
    endDate: '2018-011-06',
    minCredits: 5,
    maxCredits: 5,
    type: 'Lecture',
    gradingScale: 'General Scale, 0-5',
    teachersInCharge: [
      'Kerttu Maaria Pollari-Malmi'
    ],
    courseData: {
      id: 2,
      courseCode: 'CS-A1150',
      department: {
        en: 'Department of Computer Science',
        fi: 'Tietotekniikan laitos',
        sv: 'Institutionen för datateknik'
      },
      name: {
        en: 'Databases, Lecture',
        fi: 'Tietokannat, Luento-opetus',
        sv: 'Databaser, Föreläsning'
      }
    }
  }
];

export default mockInstances;