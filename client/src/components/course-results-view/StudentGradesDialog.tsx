// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { AttainmentGradeData, FinalGrade } from 'aalto-grades-common/types';
import {
  Box, Button, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogTitle, Typography
} from '@mui/material';
import { Params, useParams } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';

import StudentGradeList from './StudentGradeList';

import { useGetGradeTreeOfUser } from '../../hooks/useApi';

// A Dialog component for viewing the individual grades of a user.
export default function StudentGradesDialog(props: {
  user: FinalGrade | null,
  setOpen: (open: boolean) => void,
  open: boolean
}): JSX.Element {
  const { courseId, assessmentModelId }: Params =
    useParams() as { courseId: string, assessmentModelId: string };

  const grades: UseQueryResult<AttainmentGradeData> = useGetGradeTreeOfUser(
    courseId, assessmentModelId, props.user?.userId as number, { enabled: props.open }
  );

  return (
    <>
      <Dialog open={props.open} transitionDuration={{ exit: 800 }}>
        <DialogTitle>Individual grades for student {props.user?.studentNumber}:</DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          {
            (grades.data) ? (
              <StudentGradeList grades={grades.data} />
            ) : (
              <Box sx={{
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                mt: 5,
                mb: 5
              }}>
                {
                  (grades.isError) ? (
                    <Typography variant='body2'>
                      Error occured during operation. Please try again.
                    </Typography>
                  ) : (
                    <>
                      <CircularProgress sx={{ mr: 3 }} />
                      {`Loading grades for ${props.user?.studentNumber}`}
                    </>
                  )
                }
              </Box>
            )
          }
        </DialogContent>
        <DialogActions sx={{ pr: 4, py: 3 }}>
          <Button
            size='medium'
            variant='outlined'
            onClick={(): void => {
              props.setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}