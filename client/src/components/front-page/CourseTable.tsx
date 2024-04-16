// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import {JSX} from 'react';
import {useNavigate} from 'react-router-dom';

import {CourseData} from '@common/types';
import {HeadCellData} from '../../types';

const headCells: HeadCellData[] = [
  {id: 'code', label: 'Code'},
  {id: 'name', label: 'Name'},
  {id: 'department', label: 'Organizing department'},
];

const CourseTable = ({courses}: {courses: CourseData[]}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headCells.map(headCell =>
            headCell.id === 'code' ? (
              <TableCell key={headCell.id}>
                <TableSortLabel active={headCell.id === 'code'} direction="asc">
                  <Typography sx={{fontWeight: 'bold'}}>
                    {headCell.label}
                  </Typography>
                </TableSortLabel>
              </TableCell>
            ) : (
              <TableCell key={headCell.id}>
                <Typography sx={{fontWeight: 'bold'}}>
                  {headCell.label}
                </Typography>
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {courses
          .sort((a, b) => {
            const codeA = a.courseCode.toUpperCase();
            const codeB = b.courseCode.toUpperCase();
            if (codeA < codeB) return -1;
            if (codeA > codeB) return 1;
            return 0;
          })
          .map(course => (
            <TableRow
              id={`ag_see_instances_tr_${course.id}`}
              key={course.id}
              hover={true}
              onClick={() =>
                navigate(`/${course.id}/course-results`, {
                  unstable_viewTransition: true,
                })
              }
            >
              <TableCell>{course.courseCode}</TableCell>
              <TableCell>{course.name.en}</TableCell>
              <TableCell>{course.department.en}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CourseTable;
