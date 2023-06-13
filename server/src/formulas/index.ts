// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import * as yup from 'yup';

import { Formula, FormulaFunction, FormulaImplementation } from '../types/formulas';

// The registry of formula implementations corresponding to their names, along
// with a schema specifying what form their user parameters should take.
const formulaImplementations: Map<Formula, FormulaImplementation> = new Map();

// The caller should specify a schema for the user-configurable parameters
// per-formula.
/**
 * Adds a formula implementation to the formula registry.
 * @param {Formula} formula - The name and ID of the formula.
 * @param {FormulaFunction} formulaFunction - The function implementing the formula.
 * @param {yup.AnyObjectSchema} paramSchema - Schema for the parameters of this formula.
 */
export function registerFormula(
  formula: Formula,
  formulaFunction: FormulaFunction,
  paramSchema: yup.AnyObjectSchema
): void {
  formulaImplementations.set(
    formula,
    {
      formulaFunction: formulaFunction,
      paramSchema: paramSchema
    }
  );
}

export async function getFormulaImplementation(
  formulaId: Formula
): Promise<FormulaImplementation> {
  const formulaImplementation: FormulaImplementation | undefined =
    formulaImplementations.get(formulaId);

  if (!formulaImplementation) {
    throw new Error(`invalid formula ID ${formulaId}`);
  }

  return formulaImplementation;
}

// Call registerFormula in all formula definition files.
require('./manual');
require('./weightedAverage');