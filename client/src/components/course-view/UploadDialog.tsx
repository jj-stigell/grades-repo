import {Delete} from '@mui/icons-material';
import {Button, Dialog, DialogActions} from '@mui/material';
import {GridActionsCellItem, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAddGrades, useGetAttainments} from '../../hooks/useApi';
import UploadDialogConfirm from './UploadDialogConfirm';
import UploadDialogUpload from './UploadDialogUpload';
import {NewGrade} from '@common/types';

const UploadDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {courseId} = useParams() as {courseId: string};
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [rows, setRows] = useState<GridRowsProp>([]);

  const attainments = useGetAttainments(courseId);
  const addGrades = useAddGrades(courseId);

  useEffect(() => {
    if (open) {
      // reset
      setCurrentStep(0);
      setRows([]);
    }
  }, [open]);

  if (attainments.data === undefined) return <></>;

  const columns: GridColDef[] = [
    {
      field: 'StudentNo',
      headerName: 'Student Number',
      type: 'string',
      width: 120,
      editable: true,
    },
    ...attainments.data.map(att => ({
      field: att.name,
      headerName: att.name,
      type: 'number',
      editable: true,
    })),
    {
      field: 'actions',
      type: 'actions',
      getActions: params => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() =>
            setRows(oldRows => oldRows.filter(row => row.id !== params.id))
          }
        />,
      ],
    },
  ];
  const readOnlycolumns: GridColDef[] = [
    {
      field: 'StudentNo',
      headerName: 'Student Number',
      type: 'string',
    },
    ...attainments.data.map(att => ({
      field: att.name,
      headerName: att.name,
      type: 'number',
    })),
  ];

  const onSubmit = () => {
    const gradeData: NewGrade[] = [];

    for (const row of rows) {
      for (const attainment of attainments.data) {
        gradeData.push({
          studentNumber: row.StudentNo.toString(),
          attainmentId: attainment.id,
          grade: row[attainment.name],
          comment: '',
        });
      }
    }
    addGrades.mutate(gradeData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      {currentStep === 0 ? (
        <UploadDialogUpload columns={columns} rows={rows} setRows={setRows} />
      ) : (
        <UploadDialogConfirm columns={readOnlycolumns} rows={rows} />
      )}

      <DialogActions>
        {currentStep === 1 && (
          <Button
            onClick={() => setCurrentStep(cur => cur - 1)}
            sx={{mr: 'auto'}}
          >
            Back
          </Button>
        )}
        {currentStep === 0 && (
          <Button
            onClick={() => setCurrentStep(cur => cur + 1)}
            disabled={rows.length === 0}
          >
            Next
          </Button>
        )}
        {currentStep === 1 && (
          <Button
            onClick={() => {
              onClose();
              onSubmit();
            }}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default UploadDialog;