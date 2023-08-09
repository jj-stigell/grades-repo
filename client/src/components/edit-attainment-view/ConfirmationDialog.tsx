// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { AttainmentData } from 'aalto-grades-common/types';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

// A Dialog component for confirming deletion

export default function ConfirmationDialog(props: {
  deleteAttainment: (attainment: AttainmentData) => void,
  attainment: AttainmentData,
  title: string,
  subject: string,
  handleClose: () => void,
  open: boolean
}): JSX.Element {
  return (
    <Dialog open={props.open}>
      <Box sx={{ p: 2 }}>
        <DialogTitle >Delete {props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to delete this {props.subject} and all of the attainments below it?
          This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size='medium'
            variant='outlined'
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button
            size='medium'
            color='error'
            variant='contained'
            onClick={(): void => {
              props.deleteAttainment(props.attainment);
              props.handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}