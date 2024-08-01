// SPDX-FileCopyrightText: 2024 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {JSX, useEffect, useState} from 'react';

type Props = {
  children: JSX.Element;
  waitBeforeShow?: number;
};

const Delayed = ({children, waitBeforeShow = 1}: Props): JSX.Element | null => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

export default Delayed;