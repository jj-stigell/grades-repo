// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import * as yup from 'yup';

import { Status } from 'aalto-grades-common/types';

export interface CalculationResult {
  attainmentTag: string;
  grade: number;
  status: Status;
}

export interface ParamsObject<T> {
  children: Array<[string, T]>;
}

/**
 * Type of functions implementing grade calculation formulas.
 */
export type FormulaFunction = (
  attainmentTag: string,
  params: any | null, // TODO: Remove any
  subGrades: Array<CalculationResult>
) => CalculationResult;

/**
 * Stores a formula function as well as the Yup schema for validating its
 * parameters.
 */
export interface FormulaImplementation {
  formulaFunction: FormulaFunction;
  paramSchema: yup.AnyObjectSchema;
  codeSnippet: string;
  name: string;
  params: Array<string>;
  childParams: Array<string>;
}

/**
 * Stores information needed for calculating the grade of an attainment.
 */
export interface FormulaNode {
  formulaImplementation: FormulaImplementation;
  subFormulaNodes: Array<FormulaNode>;
  formulaParams: object | null;
  attainmentId: number;
  attainmentTag: string;
}
