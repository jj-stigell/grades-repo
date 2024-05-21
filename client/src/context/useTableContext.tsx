// SPDX-FileCopyrightText: 2024 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {useContext} from 'react';

import {GradesTableContext, TableContextProps} from './GradesTableProvider';

export const useTableContext = (): TableContextProps => {
  const context = useContext(GradesTableContext);
  if (context === undefined) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};