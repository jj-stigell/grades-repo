import {ExpandMore} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {DateField, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from 'dayjs';
import {Dispatch, SetStateAction, useState} from 'react';

type PropsType = {
  columns: GridColDef[];
  rows: GridRowsProp;
  dates: {
    attainmentName: string;
    completionDate: Dayjs;
    expirationDate: Dayjs;
  }[];
  setDates: Dispatch<
    SetStateAction<
      {
        attainmentName: string;
        completionDate: Dayjs;
        expirationDate: Dayjs;
      }[]
    >
  >;
};

const UploadDialogConfirm = ({columns, rows, dates, setDates}: PropsType) => {
  const [expanded, setExpanded] = useState<'' | 'date' | 'confirm'>('date');

  return (
    <>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <Accordion
          expanded={expanded === 'date'}
          onChange={(_, expanded) => setExpanded(expanded ? 'date' : '')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Completion And Expiration Dates
          </AccordionSummary>
          <AccordionDetails>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Attainment</TableCell>
                      <TableCell>Completion date</TableCell>
                      <TableCell>Expiration date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dates.map(date => (
                      <TableRow key={`dateRow-${date.attainmentName}`}>
                        <TableCell>{date.attainmentName}</TableCell>
                        <TableCell>
                          <DateField
                            slotProps={{textField: {size: 'small'}}}
                            value={date.completionDate}
                            onChange={e =>
                              setDates(oldDates =>
                                oldDates.map(oldDate =>
                                  oldDate.attainmentName ===
                                    date.attainmentName && e !== null
                                    ? {...oldDate, completionDate: e}
                                    : oldDate
                                )
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <DateField
                            slotProps={{textField: {size: 'small'}}}
                            value={date.expirationDate}
                            onChange={e =>
                              setDates(oldDates =>
                                oldDates.map(oldDate =>
                                  oldDate.attainmentName ===
                                    date.attainmentName && e !== null
                                    ? {...oldDate, expirationDate: e}
                                    : oldDate
                                )
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'confirm'}
          onChange={(_, expanded) => setExpanded(expanded ? 'confirm' : '')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Confirm Data
          </AccordionSummary>
          <AccordionDetails>
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={25}
              rowSelection={false}
              sx={{maxHeight: '70vh', minHeight: '20vh'}}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </>
  );
};

export default UploadDialogConfirm;
