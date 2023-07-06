// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { AttainmentData, Formula } from 'aalto-grades-common/types';

// These mock attainments are temporary and they will be modified later
// They have been kept in order to not break any tests or content currently in main

const mockAttainments: Array<AttainmentData> = [
  {
    id: 1,
    name: 'Exercises',
    tag: 'exercise',
    formula: Formula.WeightedAverage,
    daysValid: 100
  },
  {
    id: 2,
    name: 'Projects',
    tag: 'project',
    formula: Formula.WeightedAverage,
    daysValid: 1
  },
  {
    id: 3,
    name: 'Exams',
    tag: 'exam',
    formula: Formula.WeightedAverage,
    daysValid: 365
  }
];

export default mockAttainments;